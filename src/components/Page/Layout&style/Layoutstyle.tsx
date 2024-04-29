// Layoutstyle.tsx
import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import './Layoutstyle.scss'; // import SCSS file
import { Link } from 'react-router-dom';

const Layoutstyle: React.FC = () => {

  const [buttons, setButtons] = useState([1, 2, 3, 4, 5, 6]);

  const shuffleButtons = () => {
    const shuffledButtons = [...buttons].sort(() => Math.random() - 0.5);
    setButtons(shuffledButtons);
  };

  const moveLeft = () => {
    const newButtons = [...buttons];
    const lastButton = newButtons.pop();
    newButtons.unshift(lastButton);
    setButtons(newButtons);
  };
  const moveRight = () => {
    const newButtons = [...buttons];
    const firstButton = newButtons.shift();
    newButtons.push(firstButton);
    setButtons(newButtons);
  };

  const renderButton = (buttonNumber: number) => {
    let buttonContent;
    switch (buttonNumber) {
      case 1:
        buttonContent = <div className="oval"></div>;
        break;
      case 2:
        buttonContent = <div className="rectangle"></div>;
        break;
      case 3:
        buttonContent = <div className="parallelogram"></div>;
        break;
      case 4:
        buttonContent = <div className="circle"></div>;
        break;
      case 5:
        buttonContent = <div className="square"></div>;
        break;
      case 6:
        buttonContent = <div className="trapezoid"></div>;
        break;
      default:
        buttonContent = null;
    }

    return (
      <button className="ant-btnmain" onClick={() => shuffleButtons()}>
        {buttonContent}
      </button>
    );
  };

  return (
    <>

      <h1>Layout & Style <div className='main'><Link to="/"><Button>หน้าหลัก</Button></Link></div></h1>
      <div className="grid-container">
        <div className="grid-item"><Row gutter={16}>
          <Col span={8} >
            <button className="ant-btn1" onClick={() => moveRight()}>
              <div className="triangle"></div>
              <div className="label">Move Shapes </div>
            </button>
          </Col>
          <Col span={8}>
            <button className="ant-btn2">
              <div className="triangle2"></div>
              <div className="triangle3"></div>
          
            </button>
          </Col>
          <Col span={8}>
            <button className="ant-btn3" onClick={() => moveLeft()}><div className="triangle4"> </div><div className="label">Move Shapes </div></button>
          </Col>
        </Row>

        </div>

        <div className="grid-container">
          <Row>
            {buttons.slice(0, 3).map((buttonNumber) => (
              <Col xs={{ span: 8 }} lg={{ span: 8 }} key={buttonNumber} >
                {renderButton(buttonNumber)}
              </Col>
            ))}
          </Row>
          <Row>
            {buttons.slice(3).map((buttonNumber) => (
              <Col xs={{ span: 8 }} lg={{ span: 8 }} key={buttonNumber}>
                {renderButton(buttonNumber)}
              </Col>
            ))}
          </Row>
        </div>

      </div>
    </>
  );
}

export default Layoutstyle;
