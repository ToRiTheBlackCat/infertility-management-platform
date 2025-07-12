import React, { useEffect, useState } from "react";
import { createBlog, updateBlog, deleteBlog, fetchBlog, fetchBlogById } from "../service/authService";
import { BlogData, createBlogData, updateBlogData } from "../types/common";
import BlogImg from "../assets/img/OIP.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const DoctorBlog: React.FC = () => {
    const [blogList, setBlogList] = useState<BlogData[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<BlogData>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const doctorId = Number(useSelector((state: RootState) => state.user.userId))
    
    const [createFormData, setCreateFormData] = useState<createBlogData>({
        postTitle: '',
        postContent: '',
        image: '',
        doctorId: doctorId,
        status: 'valid'
    });
    
    const [updateFormData, setUpdateFormData] = useState<updateBlogData>({
        postTitle: '',
        postContent: '',
        image: ''
    });

    // Inline styles
    const styles = {
        container: {
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap' as const,
            gap: '10px'
        },
        title: {
            color: '#333',
            margin: 0,
            fontSize: '28px'
        },
        createBtn: {
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
        },
        loading: {
            textAlign: 'center' as const,
            fontSize: '18px',
            color: '#666',
            padding: '20px'
        },
        blogGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
        },
        blogCard: {
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s'
        },
        blogImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover' as const
        },
        blogContent: {
            padding: '15px'
        },
        blogTitle: {
            fontSize: '18px',
            fontWeight: 600,
            color: '#333',
            marginBottom: '10px'
        },
        blogExcerpt: {
            color: '#666',
            lineHeight: 1.4,
            marginBottom: '15px'
        },
        blogMeta: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            color: '#888',
            marginBottom: '15px'
        },
        blogActions: {
            display: 'flex',
            gap: '10px'
        },
        editBtn: {
            padding: '5px 15px',
            fontSize: '14px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            backgroundColor: '#28a745',
            transition: 'background-color 0.2s'
        },
        deleteBtn: {
            padding: '5px 15px',
            fontSize: '14px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            backgroundColor: '#dc3545',
            transition: 'background-color 0.2s'
        },
        modalOverlay: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        },
        modal: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflowY: 'auto' as const,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        },
        modalHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #eee',
            paddingBottom: '10px',
            marginBottom: '20px'
        },
        modalTitle: {
            margin: 0,
            color: '#333',
            fontSize: '20px'
        },
        closeBtn: {
            background: 'none',
            border: 'none',
            fontSize: '24px',
            color: '#666',
            cursor: 'pointer'
        },
        modalForm: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '15px'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column' as const
        },
        label: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '5px'
        },
        input: {
            padding: '8px 12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            transition: 'border-color 0.2s'
        },
        textarea: {
            padding: '8px 12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            resize: 'vertical' as const,
            minHeight: '100px',
            fontFamily: 'inherit'
        },
        select: {
            padding: '8px 12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px'
        },
        modalActions: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            paddingTop: '20px',
            borderTop: '1px solid #eee'
        },
        submitBtn: {
            padding: '10px 20px',
            fontSize: '14px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            backgroundColor: '#007bff',
            transition: 'background-color 0.2s'
        },
        submitBtnDisabled: {
            padding: '10px 20px',
            fontSize: '14px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'not-allowed',
            color: 'white',
            backgroundColor: '#ccc'
        },
        cancelBtn: {
            padding: '10px 20px',
            fontSize: '14px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            backgroundColor: '#6c757d',
            transition: 'background-color 0.2s'
        }
    };

    // Fetch blogs on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchBlog();
                if (response) {
                    setBlogList(response);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle form input changes
    const handleCreateInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setCreateFormData(prev => ({
            ...prev,
            [name]: name === 'doctorId' ? parseInt(value) || 0 : value
        }));
    };

    const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdateFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Open modal for creating new blog
    const handleCreateBlog = () => {
        console.log('Create blog clicked');
        setIsCreateMode(true);
        setCreateFormData({
            postTitle: '',
            postContent: '',
            image: '',
            doctorId: doctorId,
            status: 'valid'
        });
        setIsModalOpen(true);
        console.log('Modal should be open:', true);
    };

    // Open modal for editing existing blog
    const handleEditBlog = async (blogId: number) => {
        console.log('Edit blog clicked, ID:', blogId);
        try {
            const blog = await fetchBlogById(blogId);
            if (blog) {
                setIsCreateMode(false);
                setUpdateFormData({
                    postTitle: blog.postTitle,
                    postContent: blog.postContent,
                    image: blog.image
                });
                setSelectedBlog(blog);
                setIsModalOpen(true);
                console.log('Modal should be open:', true);
            }
        } catch (error) {
            console.error('Error fetching blog details:', error);
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isCreateMode) {
                // Create new blog
                const newBlog = await createBlog(createFormData);
                if (newBlog) {
                    setBlogList(prev => [...prev, newBlog]);
                }
            } else {
                // Update existing blog
                const updatedBlog = await updateBlog(updateFormData, selectedBlog!.blogPostId);
                if (updatedBlog) {
                    setBlogList(prev =>
                        prev.map(blog =>
                            blog.blogPostId === selectedBlog!.blogPostId ? updatedBlog : blog
                        )
                    );
                }
            }
            setIsModalOpen(false);
            // Reset form data
            setCreateFormData({
                postTitle: '',
                postContent: '',
                image: '',
                doctorId: doctorId,
                status: 'valid'
            });
            setUpdateFormData({
                postTitle: '',
                postContent: '',
                image: ''
            });
        } catch (error) {
            console.error('Error saving blog:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle blog deletion
    const handleDeleteBlog = async (blogId: number) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await deleteBlog(blogId);
                setBlogList(prev => prev.filter(blog => blog.blogPostId !== blogId));
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    // Format date
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Doctor Blog Management</h1>
                <button
                    onClick={handleCreateBlog}
                    style={styles.createBtn}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                    Create New Blog
                </button>
            </div>

            {loading && <div style={styles.loading}>Loading...</div>}

            <div style={styles.blogGrid}>
                {blogList.map(blog => (
                    <div 
                        key={blog.blogPostId} 
                        style={styles.blogCard}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        <div>
                            <img
                                src={blog.image || BlogImg}
                                alt={blog.postTitle}
                                style={styles.blogImage}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = BlogImg;
                                }}
                            />
                        </div>
                        <div style={styles.blogContent}>
                            <h3 style={styles.blogTitle}>{blog.postTitle}</h3>
                            <p style={styles.blogExcerpt}>
                                {blog.postContent.length > 100
                                    ? blog.postContent.substring(0, 100) + '...'
                                    : blog.postContent}
                            </p>
                            <div style={styles.blogMeta}>
                                <span style={{fontWeight: 500}}>{formatDate(blog.createdDate)}</span>
                                <span style={{fontWeight: 500}}>{blog.viewers} viewers</span>
                            </div>
                            <div style={styles.blogActions}>
                                <button
                                    onClick={() => handleEditBlog(blog.blogPostId)}
                                    style={styles.editBtn}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteBlog(blog.blogPostId)}
                                    style={styles.deleteBtn}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Create/Edit */}
            {isModalOpen && (
                <div 
                    style={styles.modalOverlay}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsModalOpen(false);
                        }
                    }}
                >
                    <div style={styles.modal}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>
                                {isCreateMode ? 'Create New Blog' : 'Edit Blog'}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                style={styles.closeBtn}
                                onMouseOver={(e) => e.currentTarget.style.color = '#333'}
                                onMouseOut={(e) => e.currentTarget.style.color = '#666'}
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} style={styles.modalForm}>
                            <div style={styles.formGroup}>
                                <label htmlFor="postTitle" style={styles.label}>Title:</label>
                                <input
                                    type="text"
                                    id="postTitle"
                                    name="postTitle"
                                    value={isCreateMode ? createFormData.postTitle : updateFormData.postTitle}
                                    onChange={isCreateMode ? handleCreateInputChange : handleUpdateInputChange}
                                    style={styles.input}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#007bff';
                                        e.target.style.boxShadow = '0 0 0 2px rgba(0, 123, 255, 0.25)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#ddd';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="postContent" style={styles.label}>Content:</label>
                                <textarea
                                    id="postContent"
                                    name="postContent"
                                    value={isCreateMode ? createFormData.postContent : updateFormData.postContent}
                                    onChange={isCreateMode ? handleCreateInputChange : handleUpdateInputChange}
                                    style={styles.textarea}
                                    rows={6}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#007bff';
                                        e.target.style.boxShadow = '0 0 0 2px rgba(0, 123, 255, 0.25)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#ddd';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="image" style={styles.label}>Image URL:</label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    value={isCreateMode ? createFormData.image : updateFormData.image}
                                    onChange={isCreateMode ? handleCreateInputChange : handleUpdateInputChange}
                                    style={styles.input}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#007bff';
                                        e.target.style.boxShadow = '0 0 0 2px rgba(0, 123, 255, 0.25)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#ddd';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                            {isCreateMode && (
                                <div style={styles.formGroup}>
                                    <label htmlFor="status" style={styles.label}>Status:</label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={createFormData.status}
                                        onChange={handleCreateInputChange}
                                        style={styles.select}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#007bff';
                                            e.target.style.boxShadow = '0 0 0 2px rgba(0, 123, 255, 0.25)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#ddd';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                        required
                                    >
                                        <option value="valid">Valid</option>
                                        <option value="invalid">Invalid</option>
                                    </select>
                                </div>
                            )}
                            <div style={styles.modalActions}>
                                <button 
                                    type="submit" 
                                    style={loading ? styles.submitBtnDisabled : styles.submitBtn}
                                    disabled={loading}
                                    onMouseOver={(e) => {
                                        if (!loading) e.currentTarget.style.backgroundColor = '#0056b3';
                                    }}
                                    onMouseOut={(e) => {
                                        if (!loading) e.currentTarget.style.backgroundColor = '#007bff';
                                    }}
                                >
                                    {loading ? 'Saving...' : (isCreateMode ? 'Create' : 'Update')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    style={styles.cancelBtn}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorBlog;