import React from "react";
// import Logo from "../images/logo1.png";

const Footer = () => {
  return (
    <>
      <footer class="bg-dark text-light py-3 mt-5">
        <div class="container">
          <div class="row text-center">
            <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <h6 class="text-uppercase font-weight-bold mb-4">About Us</h6>
              <hr className="w-25 mx-auto"></hr>
              <p class="text-muted"> Burgs eatery is a food delivery service that provides a variety of food items to choose from. We are a team of 3 people who are passionate about food and want to provide the best service to our customers.  </p>
            </div>
            <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <h6 class="text-uppercase font-weight-bold mb-4">Contact Us</h6>
              <hr className="w-25 mx-auto"></hr>

              <ul class="list-unstyled mb-0">
                <li><a href="#" class="text-muted">Email: business@burgseatery.com</a></li>
                <li><a href="#" class="text-muted">Phone: +977-9812347888</a></li>
                <li><a href="#" class="text-muted">Address: 44600, Kathmandu, Nepal</a></li>
              </ul>
            </div>
            <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <h6 class="text-uppercase font-weight-bold mb-4">Follow Us</h6>
              <hr className="w-25 mx-auto"></hr>

              <ul class="list-unstyled mb-0">
                <li><a href="#" class="text-muted">Facebook</a></li>
                <li><a href="#" class="text-muted">Twitter</a></li>
                <li><a href="#" class="text-muted">Instagram</a></li>
              </ul>
            </div>
          </div>
          <hr class="my-4" />
          <div class="row align-items-center mx-auto text-center">
            <div class="col-md-6 small text-muted">
              &copy; 2023 - All Rights Reserved
            </div>
            <div class="col-md-6 text-md-right small">
              <a href="#" class="text-muted">Privacy Policy</a>
              &nbsp; &middot; &nbsp;
              <a href="#" class="text-muted">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>

    </>
  );
};

export default Footer;
