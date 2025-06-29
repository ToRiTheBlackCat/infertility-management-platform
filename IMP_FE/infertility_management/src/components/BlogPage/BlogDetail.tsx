import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import FptUImg from '../../assets/img/fptu.jpg';

const BlogDetail = () => {
  const location = useLocation();
  const blog = location.state?.blog || {
    title: 'Empowering People to Improve Their Lives. Acadia Hospital.',
    treatment: 'Dental',
    date: 'APR 21, 2020',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr...',
    image: FptUImg,
    link: '/blogs/'
  };

  return (
    <section className="blog-detail pt-150 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div>
              <NavLink to={blog.link} className="nav-item">
                      <a className="btn theme-btn "
            data-animation="fadeInUp"
            data-duration="1.5s"
            data-delay=".9s">Back</a>
          </NavLink>
            </div>

            {/* Main image */}
            {/* <img src={FptUImg} alt="Blog main" className="img-fluid mb-4 rounded" /> */}
            <div className="service-item rounded shadow-sm overflow-hidden">
              {/* Top image with NO bottom margin */}
              <img
                src={FptUImg}
                className="img-fluid w-100"
                style={{ objectFit: 'cover', display: 'block', marginBottom: '0' }}
              />
              </div>

            {/* Metadata */}
            <div className="d-flex justify-content-start text-muted mb-3" style={{ fontSize: '0.9rem' }}>
              <span className="fw-bold me-3">{blog.treatment}</span> | <span className="ms-3">{blog.date}</span>
            </div>

            {/* Title */}
            <h2 className="mb-4 fw-bold">{blog.title}</h2>

            {/* Description - mock paragraphs */}
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...</p>
            <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren...</p>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor...</p>

            {/* Highlighted quote box */}
            <div
            style={{
              backgroundColor: '#051a43', // dark navy
              borderLeft: '6px solid #00bcd4', // teal left border
              padding: '1.5rem',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1.1rem',
              margin: '2rem 0'
            }}
          >
            <p className="mb-2">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </p>
            <p className="fw-bold mb-0">Marilyn Gilbert</p>
          </div>


            {/* More paragraphs */}
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor...</p>

            {/* Secondary image */}
            <img src={FptUImg} alt="Blog secondary" className="img-fluid my-4 rounded" />

            {/* Subheading */}
            <h5 className="fw-bold mt-4 mb-3">AMC Entertainment sparks calls for scrutiny</h5>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...</p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
