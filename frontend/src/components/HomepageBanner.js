import React from 'react'
import { Col, Row } from 'react-bootstrap'
import HeroBurgers from "../assets/images/burgssss.png"
import BurgsLogo from "../assets/images/Burgs_logo.png"

const HomepageBanner = () => {
  return (
    <>
      <Row>
        <Col md={8} lg={8} className="my-auto">
          <div>
            <img src={BurgsLogo} className=" hero_logo  " />
          </div>
          <br />
          <div>
            <h1 className='hero_main_title'>Burgs Eatery</h1>
          </div>
          <div className='pt-2'>
            <h3 className='hero_sub_title'>"Burgers that are a bite above the rest</h3>
          </div>
          <hr className='w-25' />
          <div className='py-3 '>
            <p className='hero_text'>Burgs Eatery, where we serve up juicy, mouthwatering burgers that are sure to satisfy your cravings. Our burgers are made with only the freshest, highest quality ingredients and are cooked to perfection. With a variety of toppings and flavors to choose from, you're sure to find a burger that you'll love. Come on in and taste the difference for yourself ! All Online </p>
          </div>
        </Col>

        <Col md={4} lg={4} className="bounceAnimation">
          <img src={HeroBurgers} className=" img-fluid hero_burger" />
        </Col>
      </Row>
    </>
  )
}

export default HomepageBanner