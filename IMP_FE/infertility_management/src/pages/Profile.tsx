import { DoctorData, ProfileData } from "../types/common";
import React, { useEffect, useState } from "react";
import { fetchProfile } from "../service/authService";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Profile: React.FC = () => {
    const roleId = Number(useSelector((state: RootState) => state.user.roleId));
    const userId = useSelector((state: RootState) => state.user.userId);

    const [doctorProfile, setDoctorProfile] = useState<DoctorData>();
    const [patientProfile, setPatientProfile] = useState<ProfileData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        },
        innerContainer: {
            maxWidth: '1000px',
            margin: '0 auto'
        },
        header: {
            textAlign: 'center' as const,
            marginBottom: '40px'
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '10px'
        },
        subtitle: {
            fontSize: '1.2rem',
            color: '#7f8c8d',
            marginBottom: '0'
        },
        loadingContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px'
        },
        spinner: {
            width: '50px',
            height: '50px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px'
        },
        loadingText: {
            fontSize: '1.2rem',
            color: '#7f8c8d'
        },
        errorContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px',
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            padding: '40px',
            maxWidth: '500px',
            margin: '0 auto'
        },
        errorIcon: {
            fontSize: '4rem',
            marginBottom: '20px'
        },
        errorTitle: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#e74c3c',
            marginBottom: '15px'
        },
        errorMessage: {
            fontSize: '1.1rem',
            color: '#7f8c8d',
            marginBottom: '20px'
        },
        retryButton: {
            padding: '12px 24px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
        },
        profileCard: {
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            marginBottom: '20px'
        },
        doctorHeader: {
            background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
            padding: '40px 30px',
            color: 'white'
        },
        patientHeader: {
            background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
            padding: '40px 30px',
            color: 'white'
        },
        headerContent: {
            display: 'flex',
            alignItems: 'center',
            gap: '25px'
        },
        avatarContainer: {
            position: 'relative' as const
        },
        avatar: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '4px solid white',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            objectFit: 'cover' as const
        },
        avatarPlaceholder: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '4px solid white',
            backgroundColor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem'
        },
        roleBadge: {
            position: 'absolute' as const,
            bottom: '-8px',
            right: '-8px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '4px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem'
        },
        doctorBadge: {
            backgroundColor: '#e74c3c'
        },
        patientBadge: {
            backgroundColor: '#f39c12'
        },
        headerInfo: {
            flex: 1
        },
        profileName: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '8px'
        },
        profileDegree: {
            fontSize: '1.3rem',
            opacity: 0.9,
            marginBottom: '15px'
        },
        profileRole: {
            fontSize: '1.3rem',
            opacity: 0.9,
            marginBottom: '15px'
        },
        ratingContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        star: {
            color: '#f1c40f',
            fontSize: '1.2rem'
        },
        ratingText: {
            fontSize: '1rem',
            opacity: 0.9
        },
        profileContent: {
            padding: '40px 30px'
        },
        infoGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
        },
        infoCard: {
            display: 'flex',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            border: '1px solid #e9ecef',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        },
        infoIcon: {
            fontSize: '2rem',
            marginRight: '15px',
            width: '40px',
            textAlign: 'center' as const
        },
        doctorIcon: {
            color: '#3498db'
        },
        patientIcon: {
            color: '#27ae60'
        },
        infoContent: {
            flex: 1
        },
        infoLabel: {
            fontSize: '0.9rem',
            color: '#7f8c8d',
            fontWeight: '600',
            marginBottom: '5px',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.5px'
        },
        infoValue: {
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#2c3e50'
        },
        statusBadge: {
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.5px'
        },
        activeStatus: {
            backgroundColor: '#d4edda',
            color: '#155724'
        },
        inactiveStatus: {
            backgroundColor: '#fff3cd',
            color: '#856404'
        }
    };

    useEffect(() => {
        const getProfile = async () => {
            try {
                setLoading(true);
                setError(null);
                
                if (roleId === 3 || roleId === 4) {
                    const isDoctor = roleId === 3;
                    const profile = await fetchProfile(Number(userId), isDoctor);
                    
                    if (isDoctor) {
                        setDoctorProfile(profile);
                    } else {
                        setPatientProfile(profile);
                    }
                }
            } catch (err) {
                setError("Failed to load profile information");
                console.error("Profile fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        
        getProfile();
    }, [roleId, userId]);

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p style={styles.loadingText}>Loading profile...</p>
                </div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.errorContainer}>
                    <div style={styles.errorIcon}>⚠️</div>
                    <h2 style={styles.errorTitle}>Error</h2>
                    <p style={styles.errorMessage}>{error}</p>
                    <button 
                        style={styles.retryButton}
                        onClick={() => window.location.reload()}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const renderDoctorProfile = () => (
        <div style={styles.profileCard}>
            <div style={styles.doctorHeader}>
                <div style={styles.headerContent}>
                    <div style={styles.avatarContainer}>
                        <img 
                            src={doctorProfile?.avatarImage || "/api/placeholder/100/100"} 
                            alt="Doctor Avatar" 
                            style={styles.avatar}
                        />
                        <div style={{...styles.roleBadge, ...styles.doctorBadge}}>
                            👨‍⚕️
                        </div>
                    </div>
                    <div style={styles.headerInfo}>
                        <h1 style={styles.profileName}>{doctorProfile?.fullName}</h1>
                        <p style={styles.profileDegree}>{doctorProfile?.degree}</p>
                        <div style={styles.ratingContainer}>
                            <span style={styles.star}>⭐</span>
                            <span style={styles.ratingText}>
                                {doctorProfile?.avarageScore ? `${doctorProfile.avarageScore}/5.0` : "No rating yet"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={styles.profileContent}>
                <div style={styles.infoGrid}>
                    <div 
                        style={styles.infoCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{...styles.infoIcon, ...styles.doctorIcon}}>📱</div>
                        <div style={styles.infoContent}>
                            <p style={styles.infoLabel}>Phone Number</p>
                            <p style={styles.infoValue}>{doctorProfile?.phoneNumber || "Not provided"}</p>
                        </div>
                    </div>

                    <div 
                        style={styles.infoCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{...styles.infoIcon, ...styles.doctorIcon}}>👤</div>
                        <div style={styles.infoContent}>
                            <p style={styles.infoLabel}>Gender</p>
                            <p style={styles.infoValue}>{doctorProfile?.gender || "Not specified"}</p>
                        </div>
                    </div>

                    <div 
                        style={styles.infoCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{...styles.infoIcon, ...styles.doctorIcon}}>🎂</div>
                        <div style={styles.infoContent}>
                            <p style={styles.infoLabel}>Birth Year</p>
                            <p style={styles.infoValue}>{doctorProfile?.yearOfBirth || "Not provided"}</p>
                        </div>
                    </div>

                    <div 
                        style={styles.infoCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{...styles.infoIcon, ...styles.doctorIcon}}>💼</div>
                        <div style={styles.infoContent}>
                            <p style={styles.infoLabel}>Status</p>
                            <span style={{
                                ...styles.statusBadge,
                                ...(doctorProfile?.status === 'Active' ? styles.activeStatus : styles.inactiveStatus)
                            }}>
                                {doctorProfile?.status || "Unknown"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPatientProfile = () => (
        <div style={styles.profileCard}>
            <div style={styles.patientHeader}>
                <div style={styles.headerContent}>
                    <div style={styles.avatarContainer}>
                        <div style={styles.avatarPlaceholder}>
                            👤
                        </div>
                        <div style={{...styles.roleBadge, ...styles.patientBadge}}>
                            🏥
                        </div>
                    </div>
                    <div style={styles.headerInfo}>
                        <h1 style={styles.profileName}>{patientProfile?.fullName}</h1>
                        <p style={styles.profileRole}>Patient</p>
                    </div>
                </div>
            </div>

            <div style={styles.profileContent}>
                <div style={styles.infoGrid}>
                    <div 
                        style={styles.infoCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{...styles.infoIcon, ...styles.patientIcon}}>🎂</div>
                        <div style={styles.infoContent}>
                            <p style={styles.infoLabel}>Date of Birth</p>
                            <p style={styles.infoValue}>{patientProfile?.dateOfBirth || "Not provided"}</p>
                        </div>
                    </div>

                    <div 
                        style={styles.infoCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{...styles.infoIcon, ...styles.patientIcon}}>📱</div>
                        <div style={styles.infoContent}>
                            <p style={styles.infoLabel}>Phone Number</p>
                            <p style={styles.infoValue}>{patientProfile?.phoneNumber || "Not provided"}</p>
                        </div>
                    </div>

                    <div 
                        style={styles.infoCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{...styles.infoIcon, ...styles.patientIcon}}>👤</div>
                        <div style={styles.infoContent}>
                            <p style={styles.infoLabel}>Gender</p>
                            <p style={styles.infoValue}>{patientProfile?.gender || "Not specified"}</p>
                        </div>
                    </div>

                    <div 
                        style={styles.infoCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{...styles.infoIcon, ...styles.patientIcon}}>🏠</div>
                        <div style={styles.infoContent}>
                            <p style={styles.infoLabel}>Address</p>
                            <p style={styles.infoValue}>{patientProfile?.address || "Not provided"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Profile Information</h2>
                    <p style={styles.subtitle}>
                        {roleId === 3 ? "Doctor Profile" : "Patient Profile"}
                    </p>
                </div>

                {roleId === 3 && doctorProfile && renderDoctorProfile()}
                {roleId === 4 && patientProfile && renderPatientProfile()}
            </div>
        </div>
    );
};

export default Profile;