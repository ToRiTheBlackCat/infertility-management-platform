import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import FptUImg from '../../assets/img/fptu.jpg'
import { fetchBlog } from '../../service/authService';
import { BlogData } from '../../types/common';
import { baseUrl } from '../../config/base';


const Blog = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetchBlog();
        if (response) {
          setBlogs(response);
        } else {
          console.error('No blogs found');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    getBlogs();
  },[]);
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
                alt={blog.postTitle}
                className="img-fluid w-100"
                style={{ objectFit: 'cover', display: 'block', marginBottom: '0' }}
              />

              {/* Content below image */}
              <div className="service-content p-4">
                {/* Meta row: treatment (bold) + date */}
                <div className="d-flex justify-content-between align-items-center mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
                  <span className="fw-bold">Fertility</span>
                   <span>{new Date(blog.createdDate).toLocaleDateString()}</span>
                </div>

                {/* Title */}
                <h4 className="mb-2">{blog.postTitle}</h4>

                {/* Description */}
                <p>{blog.postContent}</p>

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
