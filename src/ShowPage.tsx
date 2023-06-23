
import { useTranslation } from "react-i18next";

import dayjs from "dayjs";
const ShowPage = () => {
  const { t } = useTranslation();
  const storedData = localStorage.getItem("formData");
  const existingData = storedData ? JSON.parse(storedData) : null;
  const usedata = existingData[existingData.length - 1];
  dayjs.locale("th");
  const today = dayjs().endOf("day"); // วันที่ปัจจุบันในรูปแบบคริสต์ศักราช
  const thaiToday = today.add(543, "years"); // แปลงเป็นพุทธศักราช
  console.log(usedata);
  const thaiMonths = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  function formatIdCard(idCard:string) {
    const formattedId = `${idCard.slice(0, 1)}-${idCard.slice(1, 5)}-${idCard.slice(5, 10)}-${idCard.slice(10, 12)}-${idCard.slice(12)}`;
    return formattedId;
  }
  
  function calculateAge(
    birthDate: Date,
    currentDate: Date
  ): [number, number, number] {
    let yearDiff = currentDate.getFullYear() - birthDate.getFullYear();
    let monthDiff = currentDate.getMonth() - birthDate.getMonth();
    let dayDiff = currentDate.getDate() - birthDate.getDate();
    const daysInMonth = new Date(
      birthDate.getFullYear(),
      birthDate.getMonth() + 1,
      0
    ).getDate(); // จำนวนวันในเดือนนั้น

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      yearDiff--;
      if (currentDate.getMonth() < birthDate.getMonth()) {
        monthDiff = 12 - birthDate.getMonth() + currentDate.getMonth();
        if (currentDate.getDate() < birthDate.getDate()) {
          monthDiff--;
          dayDiff = daysInMonth - birthDate.getDate() + currentDate.getDate();
        }
      }
    }

    return [yearDiff, monthDiff, dayDiff];
  }
  const birthDate = new Date(usedata.date);
  const formattedDate = birthDate.toLocaleDateString("en", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  
  const age = calculateAge(birthDate, thaiToday.toDate());
  let management = "";
  const formattedDateParts = formattedDate.split("/");
  if (age[0] > 65 || (age[1] >= 6 && age[0] <= 2)) {
    management = "สามารถเข้ารับบริการได้";
  } else if (age[0] === 0 && age[1] < 6) {
    management = "ไม่สามารถเข้ารับบริการได้เนื่องจากอายุต่ำกว่า 6 เดือน";
  } else if (age[0] >= 2) {
    management =
      "ไม่สามารถเข้ารับบริการได้เนื่องจากอายุจะครบ 65 ปี วันที่ " +
      formattedDateParts[1] +
      "เดือน " +
      thaiMonths[parseInt(formattedDateParts[0]) - 1] +
      " ปีที่ " +
      (parseInt(formattedDateParts[2]) + 65);
  }
  return (
    <div className="h100vh d-flex justify-content-center align-item-center flex-column">
      <div className="bordercard p-5 w-50 mx-auto">
        <h1 className="text-center">
          ชื่อ : {usedata.firstName} นามสกุล: {usedata.lastName}
        </h1>
        <h1 className="text-center">บัตรประชาชน : {formatIdCard(usedata.IDcard)}</h1>
        <h1 className="text-center">เพศ : {usedata.prefix}</h1>
        <h1 className="text-center">
          วันเกิด : {formattedDateParts[1]}{" "}
          {thaiMonths[parseInt(formattedDateParts[0]) - 1]}{" พ.ศ. "}
          {formattedDateParts[2]}
        </h1>
        <h1 className="text-center">management : {management}</h1>
      </div>
    </div>
  );
};

export default ShowPage;
