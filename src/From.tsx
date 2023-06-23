import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Row, Col } from "antd";
import dayjs from "dayjs";

import React, { useState } from "react";
import { Option } from "antd/es/mentions";
import { useTranslation } from "react-i18next";

const FromDetail: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const today = dayjs().endOf("day"); // วันที่ปัจจุบันในรูปแบบคริสต์ศักราช
  const thaiToday = today.add(543, "years"); // แปลงเป็นพุทธศักราช
  const datase = localStorage.getItem("formData");

  if (datase !== null) {
    const parsedData = JSON.parse(datase);
  }

  const handleFormSubmit = (values: any) => {
    const TestPush = [];
    const formData = form.getFieldsValue();

    // เพิ่มข้อมูลใหม่ใน TestPush

    const storedData = localStorage.getItem("formData");
    const existingData = storedData ? JSON.parse(storedData) : null;
    if (existingData === null) {
      formData.key = 1;
      TestPush.push(formData);
    } else {
      console.log(existingData);
      if (Array.isArray(existingData)) {
        existingData.map((data: any) => TestPush.push(data));
      } else {
        TestPush.push(existingData);
      }

      TestPush.push(formData);
    }

    const jsonData = JSON.stringify(TestPush);
    console.log(jsonData);

    localStorage.setItem("formData", jsonData);
    // console.log(localStorage.getItem("formData"));
    
      window.location.href = "./Show";
  };
  const disabledDate = (current: dayjs.Dayjs | null) => {
    dayjs.locale('th');
    if (current) {

      return current.isAfter(thaiToday);
    }
    return false;
  };

  const handleClear = () => {
    form.resetFields();
  };
  const prefix = ["ชาย", "หญิง"];
  const outputprefix = ["ชาย", "หญิง"];

  return (
    <>
      <Form form={form} onFinish={handleFormSubmit} className="p-5 pb-3">
        <Row gutter={16} className="mb-2">
          <Col span={2}></Col>
          <Col span={10}>
            <Form.Item
              label={t("firstname")}
              name="firstName"
              rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label={t("surname")}
              name="lastName"
              rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row gutter={16} className="mb-2">
          <Col span={3}></Col>
          <Col span={4}>
            <Form.Item
              label={t("gender")}
              name="prefix"
              initialValue="เพศ"
              rules={[{ required: true, message: "กรุณากรอกคำนำหน้าชื่อ" }]}
            >
              <Select>
                {prefix.map((code, index) => (
                  <Option key={code} value={code}>
                    {outputprefix[index]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t("birthday")}
              name="date"
              rules={[{ required: true, message: "กรุณากรอกวันเกิด" }]}
            >
              <DatePicker defaultValue={thaiToday}  disabledDate={disabledDate} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={t("IDcardnumber")}
              name="IDcard"
              rules={[
                { required: true, message: "กรุณากรอกหมายเลขบัตรประชาชน" },
              ]}
            >
              <Input pattern="[0-9]*" inputMode="numeric" maxLength={13} />
            </Form.Item>
          </Col>
          <Col span={3}></Col>
        </Row>
        <Row gutter={16} className="mb-2">
          <Col span={8}></Col>
          <Col span={4}>
            <Form.Item>
              <Button htmlType="button" onClick={handleClear}>
                {t("cleanup")}
              </Button>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button htmlType="submit" >
                {t("sendinformation")}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default () => <FromDetail />;
