import React from 'react';
import { NavLink } from 'react-router-dom';
import FptUImg from '../../assets/img/fptu.jpg'

const blogs = [
  {
    title: 'Empowering People to Improve Their Lives. Acadia Hospital.',
    image: '/assets/img/fptu.jpg',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr...',
    treatment: 'Dental',
    date: 'APR 21, 2020',
  },
  {
    title: 'Creating healthy tomorrows...for one child, All Children',
    image: '/assets/img/fptu.jpg',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr...',
    treatment: 'Fertility',
    date: 'APR 22, 2020',
  },
  {
    title: 'Empowering People to Improve Their Lives. Acadia Hospital.',
    image: '/assets/img/fptu.jpg',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr...',
    treatment: 'Dental',
    date: 'APR 21, 2020',
  },
  {
    title: 'Creating healthy tomorrows...for one child, All Children',
    image: '/assets/img/fptu.jpg',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr...',
    treatment: 'Fertility',
    date: 'APR 22, 2020',
  },
];

const Blog = () => {
  return (
    <section id="blog" className="service-section pt-150 pb-120">
      <div className="container">
        <div className="row justify-content-center mb-55">
          <div className="col-xl-8 text-center">
            <div className="section-title">
              <span className="wow fadeInDown" data-wow-delay=".2s">Blog</span>
              <h2 className="mb-15 wow fadeInUp" data-wow-delay=".4s">Latest Health & Fertility Updates</h2>
              <p className="wow fadeInUp" data-wow-delay=".6s">
                Get inspired by stories and expert insights into fertility treatments and patient journeys.
              </p>
            </div>
          </div>
        </div>

       <div className="row">
        {blogs.map((blog, index) => (
          <div className="col-12 mb-30" key={index}>
            <div className="service-item rounded shadow-sm overflow-hidden">
              {/* Top image with NO bottom margin */}
              <img
                src={FptUImg}
                alt={blog.title}
                className="img-fluid w-100"
                style={{ objectFit: 'cover', display: 'block', marginBottom: '0' }}
              />

              {/* Content below image */}
              <div className="service-content p-4">
                {/* Meta row: treatment (bold) + date */}
                <div className="d-flex justify-content-between align-items-center mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
                  <span className="fw-bold">{blog.treatment}</span>
                  <span>{blog.date}</span>
                </div>

                {/* Title */}
                <h4 className="mb-2">{blog.title}</h4>

                {/* Description */}
                <p>{blog.description}</p>

                {/* Read more */}
                <NavLink to="/blog-detail" className="read-more">
                    Read More <i className="lni lni-arrow-right"></i>
                  </NavLink>
              </div>
              <div className="service-overlay img-bg"></div>
            </div>
          </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default Blog;
