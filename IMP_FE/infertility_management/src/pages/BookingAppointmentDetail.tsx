import React, { useEffect, useState } from "react";
import { PatientAppointment } from "../types/common";
import { fetchPatientAppointment } from "../service/authService";
import { useParams } from "react-router-dom";

const BookingAppointmentDetail: React.FC = () => {
    const { bookingId } = useParams();
    const [patientAppointments, setPatientAppointment] = useState<PatientAppointment[] | null>([]);
    const [loading, setLoading] = useState(true);

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        },
        innerContainer: {
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            overflow: 'hidden'
        },
        header: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '30px 40px',
            textAlign: 'center' as const
        },
        title: {
            fontSize: '2.2rem',
            fontWeight: 'bold',
            margin: '0',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        },
        appointmentId: {
            fontSize: '1rem',
            opacity: 0.9,
            margin: '10px 0 0 0',
            background: 'rgba(255,255,255,0.2)',
            padding: '8px 16px',
            borderRadius: '20px',
            display: 'inline-block'
        },
        content: {
            padding: '40px'
        },
        loadingContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px'
        },
        spinner: {
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px'
        },
        loadingText: {
            fontSize: '1.1rem',
            color: '#666'
        },
        errorContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px',
            color: '#e74c3c'
        },
        errorIcon: {
            fontSize: '4rem',
            marginBottom: '20px'
        },
        errorTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '10px'
        },
        errorText: {
            fontSize: '1.1rem',
            color: '#666'
        },
        infoSection: {
            marginBottom: '30px'
        },
        infoGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
        },
        infoCard: {
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #dee2e6',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        },
        infoLabel: {
            fontSize: '0.9rem',
            color: '#6c757d',
            fontWeight: '600',
            marginBottom: '8px',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.5px'
        },
        infoValue: {
            fontSize: '1.1rem',
            color: '#2d3748',
            fontWeight: '500',
            lineHeight: '1.4'
        },
        statusBadge: {
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.5px',
            display: 'inline-block'
        },
        statusConfirmed: {
            backgroundColor: '#d4edda',
            color: '#155724'
        },
        statusPending: {
            backgroundColor: '#fff3cd',
            color: '#856404'
        },
        statusCancelled: {
            backgroundColor: '#f8d7da',
            color: '#721c24'
        },
        statusCompleted: {
            backgroundColor: '#d1ecf1',
            color: '#0c5460'
        },
        sectionTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        sectionIcon: {
            fontSize: '1.5rem'
        },
        stepsContainer: {
            background: '#f8f9fa',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #e9ecef'
        },
        emptySteps: {
            textAlign: 'center' as const,
            color: '#6c757d',
            fontSize: '1.1rem',
            padding: '40px 20px'
        },
        emptyIcon: {
            fontSize: '3rem',
            marginBottom: '15px',
            opacity: 0.5
        },
        stepsList: {
            listStyle: 'none',
            padding: '0',
            margin: '0'
        },
        stepItem: {
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '15px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        },
        stepHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px'
        },
        stepNumber: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            fontWeight: 'bold'
        },
        stepDescription: {
            fontSize: '1.1rem',
            color: '#2d3748',
            fontWeight: '500',
            flex: 1,
            marginLeft: '15px'
        },
        stepStatus: {
            padding: '6px 12px',
            borderRadius: '15px',
            fontSize: '0.8rem',
            fontWeight: '600',
            textTransform: 'uppercase' as const
        },
        stepCompleted: {
            backgroundColor: '#d4edda',
            color: '#155724'
        },
        stepInProgress: {
            backgroundColor: '#fff3cd',
            color: '#856404'
        },
        stepPending: {
            backgroundColor: '#f8d7da',
            color: '#721c24'
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (bookingId) {
                    const numericBookingId = parseInt(bookingId);
                    const response = await fetchPatientAppointment(numericBookingId);
                    console.log(response)
                    setPatientAppointment(response);
                }
            } catch (error) {
                console.error("Failed to fetch appointment detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [bookingId]);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'confirmed':
                return styles.statusConfirmed;
            case 'pending':
                return styles.statusPending;
            case 'cancelled':
                return styles.statusCancelled;
            case 'completed':
                return styles.statusCompleted;
            default:
                return styles.statusPending;
        }
    };

    const getStepStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return styles.stepCompleted;
            case 'in progress':
            case 'in-progress':
                return styles.stepInProgress;
            case 'pending':
            default:
                return styles.stepPending;
        }
    };

    const handleCardHover = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    };

    const handleCardLeave = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.innerContainer}>
                    <div style={styles.loadingContainer}>
                        <div style={styles.spinner}></div>
                        <p style={styles.loadingText}>Loading appointment details...</p>
                    </div>
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

    if (patientAppointments?.length === 0) {
        return (
            <div style={styles.container}>
                <div style={styles.innerContainer}>
                    <div style={styles.errorContainer}>
                        <div style={styles.errorIcon}>❌</div>
                        <h3 style={styles.errorTitle}>No Appointments Found</h3>
                        <p style={styles.errorText}>No appointments found for this booking ID.</p>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Appointment Details</h2>
                </div>

                {patientAppointments?.map((appointment) => (
                    <div key={appointment.appointmentId} style={styles.content}>
                        <div style={styles.appointmentId}>ID: {appointment.appointmentId}</div>

                        <div style={styles.infoGrid}>
                            <div
                                style={styles.infoCard}
                                onMouseEnter={handleCardHover}
                                onMouseLeave={handleCardLeave}
                            >
                                <div style={styles.infoLabel}>📅 Booking ID</div>
                                <div style={styles.infoValue}>{appointment.bookingId}</div>
                            </div>

                            <div
                                style={styles.infoCard}
                                onMouseEnter={handleCardHover}
                                onMouseLeave={handleCardLeave}
                            >
                                <div style={styles.infoLabel}>🕒 Date & Time</div>
                                <div style={styles.infoValue}>
                                    {new Date(appointment.date).toLocaleString()}
                                </div>
                            </div>

                            <div
                                style={styles.infoCard}
                                onMouseEnter={handleCardHover}
                                onMouseLeave={handleCardLeave}
                            >
                                <div style={styles.infoLabel}>📋 Status</div>
                                <div style={styles.infoValue}>
                                    <span style={{
                                        ...styles.statusBadge,
                                        ...getStatusStyle(appointment.status)
                                    }}>
                                        {appointment.status}
                                    </span>
                                </div>
                            </div>

                            <div
                                style={styles.infoCard}
                                onMouseEnter={handleCardHover}
                                onMouseLeave={handleCardLeave}
                            >
                                <div style={styles.infoLabel}>📝 Note</div>
                                <div style={styles.infoValue}>
                                    {appointment.note || "No additional notes"}
                                </div>
                            </div>
                        </div>

                        <div style={styles.sectionTitle}>
                            <span style={styles.sectionIcon}>🔄</span>
                            Treatment Steps
                        </div>

                        <div style={styles.stepsContainer}>
                            {!appointment.stepDetails || appointment.stepDetails.length === 0 ? (
                                <div style={styles.emptySteps}>
                                    <div style={styles.emptyIcon}>📋</div>
                                    <p>No step details available for this appointment.</p>
                                </div>
                            ) : (
                                <ul style={styles.stepsList}>
                                    {appointment.stepDetails.map((step, index) => (
                                        <li
                                            key={step.stepId}
                                            style={styles.stepItem}
                                            onMouseEnter={handleCardHover}
                                            onMouseLeave={handleCardLeave}
                                        >
                                            <div style={styles.stepHeader}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div style={styles.stepNumber}>{index + 1}</div>
                                                    <div style={styles.stepDescription}>{step.description}</div>
                                                </div>
                                                <span style={{
                                                    ...styles.stepStatus,
                                                    ...getStepStatusStyle(step.status)
                                                }}>
                                                    {step.status}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <hr style={{ margin: '40px 0', borderTop: '1px solid #e2e8f0' }} />
                    </div>
                ))}

                <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
            </div>
        </div>

    );
};

export default BookingAppointmentDetail;