/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Space, Button, Modal, Form, Input, Select, Checkbox, Row, Col } from 'antd';
import { fetchUserData, fetchUserDataById } from '../../Actions/userActions';
import { deleteUserData, editUserData, selectUserData, setUserData } from '../../Slice/userSlice';
import { UserData, newForm } from '../../Slice/types';
import Swal from 'sweetalert2';

interface DataSourceItem extends newForm {
  title: any;
  key: string;
}

const MyTable: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [editedUserData, setEditedUserData] = useState<UserData | null>(null);


  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      dispatch(setUserData(parsedData));
    } else {
      dispatch(fetchUserData());
    }
  }, [dispatch]);

  const handleDelete = (id: string) => {

    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการลบข้อมูลนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบข้อมูล!',
      cancelButtonText: 'ไม่, ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserData(id));
        Swal.fire(
          'ลบสำเร็จ!',
          'ข้อมูลได้ถูกลบออกเรียบร้อยแล้ว',
          'success'
        );
      }
    });
  };
  const handleEdit = async (id: string) => {
    dispatch(fetchUserDataById(id));
    setIsEditing(true);
    setSelectedId(id);
    const editedData = userData.find(user => user.id === id);
    setEditedUserData(editedData);
    console.log(editedData);


  };

  const handleSaveEdit = () => {

    dispatch(editUserData(editedUserData));
    setIsEditing(false);
    setSelectedId('');
    setEditedUserData(null);
    console.log(editedUserData);

  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedId('');
    setEditedUserData(null); 
  };


  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: string[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleDeleteSelected = () => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการลบข้อมูลที่เลือกทั้งหมดหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบข้อมูล!',
      cancelButtonText: 'ไม่, ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        selectedRowKeys.forEach((id) => {
          dispatch(deleteUserData(id));
        });
        setSelectedRowKeys([]);
        Swal.fire(
          'ลบสำเร็จ!',
          'ข้อมูลที่เลือกได้ถูกลบออกเรียบร้อยแล้ว',
          'success'
        );
      }
    });
  };

  const columns = [
    {
      title: 'ชื่อ',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a: DataSourceItem, b: DataSourceItem) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'เพศ',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: DataSourceItem, b: DataSourceItem) => a.title.localeCompare(b.title),
    },
    {
      title: 'หมายเลขโทรศัพท์',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      sorter: (a: DataSourceItem, b: DataSourceItem) => a.mobileNumber.localeCompare(b.mobileNumber),
    },
    {
      title: 'หมายเลขบัตรประชาชน',
      dataIndex: 'idCardNumber',
      key: 'idCardNumber',
    },
    {
      title: 'จัดการ',
      key: 'action',
      render: (_text: any, record: DataSourceItem) => (
        <Space size="middle">
          {record.id !== undefined && (
            <>
              <Button type="link" onClick={() => handleEdit(record.id!)}>แก้ไข</Button>
              <Button type="link" onClick={() => handleDelete(record.id!)}>ลบ</Button>
            </>
          )}
        </Space>
      ),
    },
  ];


  const dataSource: DataSourceItem[] = Array.isArray(userData)
    ? userData.map((user: any) => ({
      id: user.id,
      firstName: user.firstName,
      title: user.title,
      mobileNumber: user.mobileNumber,
      idCardNumber: user.idCardNumber,
      key: user.id,
      lastName: user.lastName, 
      birthDate: user.birthDate, 
      nationality: user.nationality, 

    }))
    : [];


  // const dataSource: DataSourceItem[] = userData ? userData.map((user: any) => ({
  //   id: user.id,
  //   firstName: user.firstName,
  //   title: user.title,
  //   mobileNumber: user.mobileNumber,
  //   idCardNumber: user.idCardNumber,
  // })) : [];

  return (
    <>
      <Button onClick={handleDeleteSelected} type="primary" danger disabled={selectedRowKeys.length === 0} style={{ marginBottom: '10px' }}>
        ลบที่เลือก
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        rowSelection={rowSelection}
      />
      <Modal
        visible={isEditing}
        title="แก้ไขข้อมูล"
        onCancel={handleCancelEdit}
        footer={[
          <Button key="cancel" onClick={handleCancelEdit}>
            ยกเลิก
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveEdit}>
            บันทึก
          </Button>,
        ]}
        width={1000}
        style={{ top: 20 }}
      >
        <Form
          initialValues={{
            title: editedUserData?.title || '',
            firstName: editedUserData?.firstName || '',
            lastName: editedUserData?.lastName || '',
            birthDate: editedUserData?.birthDate || '',
            nationality: editedUserData?.nationality || '',
            idCardPart1: editedUserData?.idCardNumber?.part1 || '',
            idCardPart2: editedUserData?.idCardNumber?.part2 || '',
            idCardPart3: editedUserData?.idCardNumber?.part3 || '',
            idCardPart4: editedUserData?.idCardNumber?.part4 || '',
            idCardPart5: editedUserData?.idCardNumber?.part5 || '',
            gender: editedUserData?.gender || [],
            mobileNumber: editedUserData?.mobileNumber || '',
            passportNumber: editedUserData?.passportNumber || '',
            expectedSalary: editedUserData?.expectedSalary || '',
          }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="title"
                label="คำนำหน้า"
                rules={[{ required: true, message: 'Please select your title!' }]}
              >
                <Select placeholder="กรุณาเลือกคำนำหน้า">
                  <Select.Option value="ชาย">ชาย</Select.Option>
                  <Select.Option value="หญิง">หญิง</Select.Option>
                  <Select.Option value="ไม่ระบุ">ไม่ระบุ</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                name="firstName"
                label="ชื่อจริง"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                name="lastName"
                label="นามสกุล"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="birthDate"
                label="วันเกิด"
                rules={[{ required: true, message: 'Please input your birth date!' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="สัญชาติ "
                name="nationality"
                rules={[{ required: true, message: 'Please input your nationality!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="เลขบัตรประชาชน">
            <Row gutter={16}>
              <Col span={2}>
                <Form.Item name="idCardPart1" noStyle>
                  <Input maxLength={2} />
                </Form.Item>
              </Col>
              <Col span={1} style={{ textAlign: 'center' }}>
                <span>-</span>
              </Col>
              <Col span={3}>
                <Form.Item name="idCardPart2" noStyle>
                  <Input maxLength={3} />
                </Form.Item>
              </Col>
              <Col span={1} style={{ textAlign: 'center' }}>
                <span>-</span>
              </Col>
              <Col span={6}>
                <Form.Item name="idCardPart3" noStyle>
                  <Input maxLength={3} />
                </Form.Item>
              </Col>
              <Col span={1} style={{ textAlign: 'center' }}>
                <span>-</span>
              </Col>
              <Col span={2}>
                <Form.Item name="idCardPart4" noStyle>
                  <Input maxLength={2} />
                </Form.Item>
              </Col>
              <Col span={1} style={{ textAlign: 'center' }}>
                <span>-</span>
              </Col>
              <Col span={3}>
                <Form.Item name="idCardPart5" noStyle>
                  <Input maxLength={3} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="เพศ" name="gender" rules={[{ required: true, message: 'Please input your nationality!' }]} >
            <Checkbox.Group className="round-checkbox-group" style={{ width: '100%' }}>
              <Checkbox value="male">ชาย</Checkbox>
              <Checkbox value="female">หญิง</Checkbox>
              <Checkbox value="other">ไม่ระบุ</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            label="หมายเลขมือถือ"
            rules={[{ required: true, message: 'Please input your mobile number!' }]}
          >
            <Row gutter={16}>
              <Input.Group compact>
                <Col span={9}>
                  <Select defaultValue="+66" >
                    <Select.Option value="+66">+66</Select.Option>
                    <Select.Option value="+99">+99</Select.Option>
                  </Select>
                </Col>
                <Col span={1} style={{ textAlign: 'center' }}>
                  <span>-</span>
                </Col>
                <Col span={6}>
                  <Input placeholder="กรอกหมายเลขโทรศัพท์"  maxLength={10} name="mobileNumber"  />
                </Col>
              </Input.Group>
            </Row>
          </Form.Item>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="เลขหนังสือเดินทาง" name="passportNumber">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal >
    </>
  );
};

export default MyTable;
