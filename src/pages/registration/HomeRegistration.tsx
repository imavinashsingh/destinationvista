import React from 'react';

const HomeRegistration: React.FC = () => {
  return (
    <div className="container-fluid bg-registration py-5" style={{ margin: '90px 0' }}>
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Offer Section */}
          <div className="col-lg-7 mb-5 mb-lg-0">
            <div className="mb-4">
              <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>Mega Offer</h6>
              <h1 className="text-white">
                <span className="text-primary">30% OFF</span> For Honeymoon
              </h1>
            </div>
            <p className="text-white">
              Discover romance and adventure with our exclusive honeymoon offer! Enjoy 30% off on select packages, 
              and make your special moments unforgettable with luxurious stays, scenic destinations, and curated experiences just for you.
            </p>
            <ul className="list-inline text-white m-0">
              <li className="py-2">
                <i className="fa fa-check text-primary mr-3"></i>
                Indulge in romantic getaways at unbeatable prices.
              </li>
              <li className="py-2">
                <i className="fa fa-check text-primary mr-3"></i>
                Personalized itineraries to suit your perfect honeymoon.
              </li>
              <li className="py-2">
                <i className="fa fa-check text-primary mr-3"></i>
                Affordable Luxury, from tropical beaches to cozy mountain retreats.
              </li>
            </ul>
          </div>

          {/* Registration Form */}
          <div className="col-lg-5">
            <div className="card border-0">
              <div className="card-header bg-primary text-center p-4">
                <h1 className="text-white m-0">Sign Up Now</h1>
              </div>
              <div className="card-body rounded-bottom bg-white p-5">
                <form>
                  {/* Name Input */}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control p-4"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  {/* Email Input */}
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control p-4"
                      placeholder="Your email"
                      required
                    />
                  </div>
                  {/* Destination Dropdown */}
                  <div className="form-group">
                    <select className="custom-select px-4" style={{ height: '47px' }} required>
                      <option value="" selected disabled>Select a destination</option>
                      <option value="1">Maharashtra</option>
                      <option value="2">Goa</option>
                      <option value="3">Rajasthan</option>
                    </select>
                  </div>
                  {/* Submit Button */}
                  <div>
                    <button className="btn btn-primary btn-block py-3" type="submit">
                      Sign Up Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRegistration;
