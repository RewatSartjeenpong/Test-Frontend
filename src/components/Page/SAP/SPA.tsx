/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Select, Button, Checkbox, Row, Col, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { saveForm, resetForm } from '../../Slice/formSlice';
import FormItem from 'antd/es/form/FormItem';
import MyTable from './Table';
import { DownOutlined } from '@ant-design/icons';
const { Option } = Select;
import Swal from 'sweetalert2';
interface FormState {
    idCardPart1: any;
    idCardPart2: any;
    idCardPart3: any;
    idCardPart4: any;
    idCardPart5: any;
    title: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    nationality: string;
    idCardNumber: string; // Updated to a single string
    gender: string[];
    mobileNumber: string;
    passportNumber: string;
    expectedSalary: string;
}
interface MenuItem {
    key: string;
    label: string;
}

const SPA: React.FC = () => {
    const [form] = Form.useForm<FormState>();
    const dispatch = useDispatch();

    const onReset = () => {
        form.resetFields();
        dispatch(resetForm());
    };


    const onFinish = (values: FormState) => {
        const idCardNumber = `${values.idCardPart1}-${values.idCardPart2}-${values.idCardPart3}-${values.idCardPart4}-${values.idCardPart5}`;
        const { idCardPart1, idCardPart2, idCardPart3, idCardPart4, idCardPart5, ...updatedValues } = values;
        updatedValues.idCardNumber = idCardNumber;
        console.log('Received values of form: ', updatedValues);
        dispatch(saveForm(updatedValues));
        Swal.fire({
            icon: 'success',
            title: 'ส่งสำเร็จ',
            text: 'ข้อมูลได้ถูกส่งเรียบร้อยแล้ว',
        }).then(() => {
            window.location.reload()
        });
    };

    const menuItems: MenuItem[] = [
        { key: '1', label: 'TH' },
        { key: '2', label: 'ENG' },
    ];

    const menu = (
        <Menu onClick={(e) => console.log('Menu click', e)}>
            {menuItems.map(item => (
                <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div>


            <h3>การจัดหน้า ฟอร์ม</h3>
            <div className='right-align-mainpage'>
                <Dropdown overlay={menu}>
                    <Button>
                        แปลภาษา <DownOutlined />
                    </Button>
                </Dropdown>
                <Link to="/"><Button>หน้าหลัก</Button></Link>
            </div>

            <div className="form-container">
                <Form

                    form={form}
                    onFinish={onFinish}
                    initialValues={{
                        title: '',
                        firstName: '',
                        lastName: '',
                        birthDate: '',
                        nationality: '',
                        idCardNumber: { part1: '', part2: '', part3: '', part4: '', part5: '' },
                        gender: [],
                        mobileNumber: '',
                        passportNumber: '',
                        expectedSalary: ''
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
                                    <Option value="ชาย">ชาย</Option>
                                    <Option value="หญิง">หญิง</Option>
                                    <Option value="ไม่ระบุ">ไม่ระบุ</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item
                                name="firstName"
                                label="ชื่อจริง"
                                rules={[{ required: true, message: 'กรุณาใส่ชื่อของคุณ' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item
                                name="lastName"
                                label="นามสกุล"
                                rules={[{ required: true, message: 'กรุณาใส่นามสกุลของคุณ' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <FormItem

                                name="birthDate"
                                label="วันเกิด"
                                rules={[{ required: true, message: 'กรุณาใส่วันเกิดของคุณ' }]}
                            >
                                <Input type="date" />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <Form.Item

                                label="สัญชาติ "
                                name="nationality"
                                rules={[{ required: true, message: 'กรุณาใส่สัญชาติของคุณ' }]}
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
                        name="mobileNumber"
                        rules={[{ required: true, message: 'กรุณาใส่หมายเลขมือถือ' }]}
                        
                    >
                        <Row gutter={16}>
                            <Input.Group compact>

                                <Col span={9}>
                                    <Select defaultValue="+66" >
                                        <Option value="+66">+66</Option>
                                        <Option value="+99">+99</Option>
                                    </Select>
                                </Col>
                                <Col span={1} style={{ textAlign: 'center' }}>
                                    <span>-</span>
                                </Col>
                                <Col span={6}>
                                    <Input placeholder="กรอกหมายเลขโทรศัพท์" maxLength={10} />
                                </Col>
                            </Input.Group></Row>
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="เลขหนังสือเดินทาง" name="passportNumber" rules={[{ required: true, message: 'กรุณาใส่เลขหนังสือเดินทาง' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label={<span><span style={{ color: 'red' }}> *</span> เงินเดือนที่คาดหวัง</span>} name="expectedSalary" rules={[{ required: true, message: 'กรุณาใส่เงินเดือนที่คาดหวัง' }]}>
                                <Input />

                            </Form.Item>
                        </Col>
                        <Button htmlType="submit">
                            ส่งข้อมูล
                        </Button>
                        <Button htmlType="button" onClick={onReset} style={{ marginLeft: 8 }}>
                            ล้างข้อมูล
                        </Button>
                    </Row>
                </Form>
            </div>
            <div style={{ padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ marginBottom: '10px' }}>ตารางข้อมูล</h3>

                <div style={{ overflowX: 'auto' }}>
                    <MyTable />
                </div>
            </div>
        </div>
    );
};

export default SPA;
