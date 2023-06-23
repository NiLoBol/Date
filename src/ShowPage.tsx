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
  function formatIdCard(idCard: string) {
    const formattedId = `${idCard.slice(0, 1)}-${idCard.slice(
      1,
      5
    )}-${idCard.slice(5, 10)}-${idCard.slice(10, 12)}-${idCard.slice(12)}`;
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
  const Text: React.FC = () => {
    if (age[0] > 65 || (age[1] >= 6 && age[0] === 0)||(age[0] >= 0 && age[0] < 2)||(age[1] == 0 && age[0] == 2)) {
      console.log(age[0]+"ปี"+age[1]);
      return <h1 className="green">สามารถเข้ารับบริการได้</h1>;
    } else if (age[0] === 0 && age[1] < 6) {
      return (
        <h1>
          <span className="red">ไม่สามารถเข้ารับบริการได้</span> เนื่องจากอายุต่ำกว่า 6 เดือน
        </h1>
      );
    } else if (age[0] >= 2) {
      return (
        <h1>
          <span className="red">ไม่สามารถเข้ารับบริการได้</span> เนื่องจากอายุจะครบ 65 ปี วันที่ {formattedDateParts[1]} เดือน {thaiMonths[parseInt(formattedDateParts[0]) - 1]} ปีที่ {(parseInt(formattedDateParts[2]) + 65)}
        </h1>
      );
    }
  
    // Handle the case when none of the conditions are met
    return null;
  };
  
  const age = calculateAge(birthDate, thaiToday.toDate());
  const formattedDateParts = formattedDate.split("/");
  
  return (
    <div className="h100vh d-flex justify-content-center align-item-center flex-column">
      <div className="bordercard p-5 w-50 mx-auto">
        <h1 className="text-center">
          {t("name")} : {usedata.firstName} {t("surname")}: {usedata.lastName}
        </h1>
        <h1 className="text-center">
          {t("IDcardnumber")} : {formatIdCard(usedata.IDcard)}
        </h1>
        <h1 className="text-center">
          {t("gender")} : {usedata.prefix}
        </h1>
        <h1 className="text-center">
          {t("gender")} : {formattedDateParts[1]}{" "}
          {thaiMonths[parseInt(formattedDateParts[0]) - 1]}
          {" พ.ศ. "}
          {formattedDateParts[2]}
        </h1>
        <div className="text-center"><Text></Text></div>
      </div>
    </div>
  );
};

export default ShowPage;
