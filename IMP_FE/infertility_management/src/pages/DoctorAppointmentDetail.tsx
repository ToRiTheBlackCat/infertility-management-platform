import React, { useEffect, useState } from "react";
import {
    fetchDoctorAppointmentDetail, fetchAppointmentStepDetail,
    createDoctorAppointment, createDoctorAppointmentStepDetails,
    editStatusStepDetail, updateDoctorAppointmentStepDetails,
    deleteDoctorAppointmentStepDetails, editDoctorAppointment,
    deleteDoctorAppointment, finishDoctorAppointment
} from "../service/authService";
import { PatientAppointment } from "../types/common";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toast } from "react-toastify";


const DoctorAppointmentDetail: React.FC = () => {
    const { bookingId } = useParams();
    const doctorId = Number(useSelector((state: RootState) => state.user.userId));
    const [detail, setDetail] = useState<PatientAppointment | null>(null);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [noteInput, setNoteInput] = useState("");
    const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false)
    const [stepDescriptionInput, setStepDescriptionInput] = useState("");
    const [creatingStep, setCreatingStep] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [editingStep, setEditingStep] = useState<{ stepId: number; description: string } | null>(null);
    const [newDescription, setNewDescription] = useState('');
    const [showUpdateAppointmentModal, setShowUpdateAppointmentModal] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState<PatientAppointment | null>(null);
    const [updatedNote, setUpdatedNote] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');

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

    const location = useLocation();
    const state = location.state as {
        createdDate: string;
        status: string;
        note: string;
        patientId: number;
        appointmentId?: number;
    };
    const isDateOlderThan3Days = (date: string | Date): boolean => {
        const now = new Date();
        const target = new Date(date);
        const diffTime = target.getTime() - now.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays >= 4;
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (bookingId) {
                    const numericBookingId = parseInt(bookingId);
                    const data = await fetchDoctorAppointmentDetail(numericBookingId);
                    if (Array.isArray(data) && data.length > 0) {
                        setAppointments(data);
                        const selected = state?.appointmentId
                            ? data.find(app => app.appointmentId === state.appointmentId)
                            : data[0];
                        if (selected) {
                            const steps = await fetchAppointmentStepDetail(selected.appointmentId);
                            setDetail({ ...selected, stepDetails: steps });
                        }
                    } else {
                        setAppointments([]);
                        setDetail(null);
                    }
                }
            } catch (error) {
                console.error("Error fetching appointment details:", error);
                setAppointments([]);
                setDetail(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [bookingId, state?.appointmentId]);

    const handleCreateAppointment = async () => {
        if (!bookingId || !state) return;
        setCreating(true);
        const result = await createDoctorAppointment(
            parseInt(bookingId),
            new Date(state.createdDate),
            state.patientId,
            doctorId,
            noteInput
        );
        if (result === 200) {
            toast.success("Appointment created successfully.");
            window.location.reload();
        } else {
            toast.error("Failed to create appointment.");
        }
        setCreating(false);
    };

    const getStatusStyle = (status: string) => {
        switch (status.trim().toLowerCase()) {
            case 'completed':
            case 'đã hoàn thành':
                return { backgroundColor: '#d1ecf1', color: '#0c5460' };
            case 'pending':
            case 'đang chờ':
                return { backgroundColor: '#fff3cd', color: '#856404' };
            case 'in progress':
            case 'đang thực hiện':
                return { backgroundColor: '#d4edda', color: '#155724' };
            case 'cancelled':
            case 'đã huỷ':
                return { backgroundColor: '#f8d7da', color: '#721c24' };
            default:
                return {};
        }
    };

    const getStepStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'đã hoàn thành':
                return { backgroundColor: '#d4edda', color: '#155724' };
            case 'đang thực hiện':
                return { backgroundColor: '#fff3cd', color: '#856404' };
            case 'chưa thực hiện':
                return { backgroundColor: '#f8d7da', color: '#721c24' };
            default:
                return {};
        }
    };
    const handleFinishStep = async (stepId: number) => {
        if (!detail?.appointmentId || !doctorId) {
            toast.warning("Missing appointment or doctor information.");
            return;
        }

        try {
            const res = await editStatusStepDetail(detail.appointmentId, stepId, doctorId);
            if (res === 200) {
                toast.success("Step marked as completed.");
                // Refetch updated step details
                const updatedSteps = await fetchAppointmentStepDetail(detail.appointmentId);
                setDetail(prev => prev ? { ...prev, stepDetails: updatedSteps } : prev);
            } else {
                toast.error("Failed to update step status.");
            }
        } catch (error) {
            console.error("Error finishing step:", error);
            toast.error("An error occurred while finishing the step.");
        }
    };
    const handleCreateStepDetail = async () => {
        if (!detail?.appointmentId || !doctorId || !stepDescriptionInput.trim()) {
            toast.warning("Please enter a valid step description.");
            return;
        }
        const newStepId = (detail.stepDetails?.length || 0) + 1;
        setCreatingStep(true);
        try {
            const res = await createDoctorAppointmentStepDetails(
                detail.appointmentId,
                newStepId,
                stepDescriptionInput.trim(),
                doctorId
            );

            if (res === 200) {
                toast.success("Step detail created successfully.");
                setShowModal(false);
                setStepDescriptionInput(""); // reset
                // Refetch updated steps
                const updatedSteps = await fetchAppointmentStepDetail(detail.appointmentId);
                setDetail(prev => prev ? { ...prev, stepDetails: updatedSteps } : prev);
            } else {
                toast.error("Failed to create step detail.");
            }
        } catch (err) {
            console.error("Error creating step detail:", err);
            toast.error("An error occurred while creating step detail.");
        } finally {
            setCreatingStep(false);
        }
    };

    const handleDeleteStep = async (stepId: number) => {
        if (!detail) return;

        if (!isDateOlderThan3Days(detail.date)) {
            toast.warning("You can only delete step details from appointments older than 3 days.");
            return;
        }
        try {
            const result = await deleteDoctorAppointmentStepDetails(
                detail!.appointmentId,
                stepId,
                doctorId
            )
            if (result === 200) {
                toast.success("Step detail delete successfully.");
            }
        } catch (err) {
            console.error("Error creating step detail:", err);
            toast.error("An error occurred while creating step detail.");
        }
    }

    const handleUpdateStep = (stepId: number) => {
        if (!detail) return;
        if (!isDateOlderThan3Days(detail.date)) {
            toast.warning("You can only update step details from appointments older than 3 days.");
            return;
        }
        const step = detail?.stepDetails.find(s => s.stepId === stepId);
        if (!step) return;
        setEditingStep({ stepId, description: step.description });
        setNewDescription(step.description); // gán mô tả hiện tại vào ô nhập
        setShowUpdateModal(true);
    };
    const handleConfirmUpdate = async () => {
        if (!detail?.appointmentId || !doctorId || !editingStep) return;

        try {
            const res = await updateDoctorAppointmentStepDetails(
                detail.appointmentId,
                editingStep.stepId,
                newDescription.trim(),
                doctorId
            );

            if (res === 200) {
                toast.success("Step updated successfully");

                const updatedSteps = await fetchAppointmentStepDetail(detail.appointmentId);
                setDetail(prev => prev ? { ...prev, stepDetails: updatedSteps } : null);

                setShowUpdateModal(false);
                setEditingStep(null);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update step");
        }
    };
    const handleUpdateAppointment = (appointment: PatientAppointment) => {
        if (!isDateOlderThan3Days(appointment.date)) {
            toast.warning("You can only update appointments that are older than 3 days.");
            return;
        }
        setEditingAppointment(appointment);
        setUpdatedNote(appointment.note || '');
        setUpdatedDate(new Date(appointment.date).toISOString().slice(0, 16)); // for datetime-local input
        setShowUpdateAppointmentModal(true);
    };
    const handleConfirmUpdateAppointment = async () => {
        if (!editingAppointment || !doctorId) return;

        try {
            const date = new Date(updatedDate);
            const res = await editDoctorAppointment(
                editingAppointment.appointmentId,
                date,
                updatedNote.trim(),
                doctorId
            );

            if (res === 200) {
                toast.success("Appointment updated successfully");
                setShowUpdateAppointmentModal(false);
                window.location.reload(); // Hoặc refetch lại list nếu không muốn reload
            }
        } catch (err) {
            toast.error("Failed to update appointment");
            console.error(err);
        }
    };


    const handleDeleteAppointment = async (appointmentId: number) => {
        const appointment = appointments.find(app => app.appointmentId === appointmentId);
        if (!appointment || !isDateOlderThan3Days(appointment.date)) {
            toast.warning("You can only delete appointments that are older than 3 days.");
            return;
        }
        const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
        if (!confirmDelete) return;

        try {
            const res = await deleteDoctorAppointment(appointmentId, doctorId);
            if (res === 200) {
                toast.success("Appointment deleted successfully.");
                // Xóa appointment khỏi danh sách và reset detail nếu đang chọn
                setAppointments(prev => prev.filter(app => app.appointmentId !== appointmentId));
                if (detail?.appointmentId === appointmentId) {
                    setDetail(null);
                }
            } else {
                toast.error("Failed to delete appointment.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("An error occurred while deleting the appointment.");
        }
    };

    const handleFinishAppointment = async (appointmentId: number) => {
        if (!detail?.appointmentId || !doctorId) {
            toast.warning("Missing appointment or doctor information.");
            return;
        }
        const appointment = appointments.find(app => app.appointmentId === appointmentId);
        if (!appointment) {
            toast.warning("Appointment not found.");
            return;
        }

        if (appointment.status.trim().toLowerCase() === "đã hoàn thành") {
            toast.info("This appointment is already completed.");
            return;
        }

        try {
            const res = await finishDoctorAppointment(appointmentId, doctorId);
            if (res === 200) {
                toast.success("Step marked as completed.");

            } else {
                toast.error("Failed to update step status.");
            }
        } catch (error) {
            console.error("Error finishing step:", error);
            toast.error("An error occurred while finishing the step.");
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Booking Appointment Details</h2>
                    <div style={styles.appointmentId}>ID: {detail?.appointmentId}</div>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loadingContainer}>
                            <div style={styles.spinner}></div>
                            <div style={styles.loadingText}>Loading appointment details...</div>
                        </div>
                    ) : (
                        <>
                            <div style={styles.infoGrid}>
                                <div style={styles.infoCard}>
                                    <div style={styles.infoLabel}>📅 Booking ID</div>
                                    <div style={styles.infoValue}>{bookingId}</div>
                                </div>
                                <div style={styles.infoCard}>
                                    <div style={styles.infoLabel}>🕒 Date & Time</div>
                                    <div style={styles.infoValue}>
                                        {state?.createdDate
                                            ? new Date(state.createdDate).toLocaleString()
                                            : detail
                                                ? new Date(detail.date).toLocaleString()
                                                : "N/A"}
                                    </div>
                                </div>
                                <div style={styles.infoCard}>
                                    <div style={styles.infoLabel}>📋 Status</div>
                                    <div style={styles.infoValue}>
                                        <span style={{
                                            ...styles.statusBadge,
                                            ...getStatusStyle(state?.status || detail?.status || '')
                                        }}>
                                            {state?.status || detail?.status || "N/A"}
                                        </span>
                                    </div>
                                </div>
                                <div style={styles.infoCard}>
                                    <div style={styles.infoLabel}>📝 Note</div>
                                    <div style={styles.infoValue}>
                                        {state?.note || detail?.note || "No additional notes"}
                                    </div>
                                </div>
                            </div>

                            {appointments.length > 0 && (
                                <div style={{ marginTop: "40px" }}>
                                    <h3 style={{ marginBottom: "20px", fontWeight: "bold", fontSize: "1.5rem" }}>
                                        All Appointments in This Booking
                                    </h3>
                                    <table style={{
                                        width: "100%",
                                        borderCollapse: "collapse",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                                    }}>
                                        <thead>
                                            <tr style={{ background: "#f0f0f0" }}>
                                                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Appointment ID</th>
                                                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Date</th>
                                                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Status</th>
                                                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Note</th>
                                                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map((item) => (
                                                <tr
                                                    key={item.appointmentId}
                                                    style={{
                                                        background: detail?.appointmentId === item.appointmentId ? '#e0f7fa' : 'white',
                                                        transition: 'background 0.2s ease',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={async () => {
                                                        const steps = await fetchAppointmentStepDetail(item.appointmentId);
                                                        setDetail({ ...item, stepDetails: steps });
                                                    }}
                                                >
                                                    <td style={{ padding: "10px", border: "1px solid #eee" }}>{item.appointmentId}</td>
                                                    <td style={{ padding: "10px", border: "1px solid #eee" }}>{new Date(item.date).toLocaleString()}</td>
                                                    <td style={{ padding: "10px", border: "1px solid #eee" }}>{item.status.trim()}</td>
                                                    <td style={{ padding: "10px", border: "1px solid #eee" }}>{item.note}</td>
                                                    <td style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '10px', border: '1px solid #eee' }}>
                                                        <button
                                                            style={{
                                                                padding: "6px 16px",
                                                                background: "#764ba2",
                                                                color: "white",
                                                                border: "none",
                                                                borderRadius: "6px",
                                                                cursor: "pointer"
                                                            }}
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            style={{
                                                                padding: "6px 12px",
                                                                background: "#17a2b8",
                                                                color: "white",
                                                                border: "none",
                                                                borderRadius: "6px",
                                                                marginRight: "6px",
                                                                cursor: "pointer"
                                                            }}
                                                            onClick={() => handleUpdateAppointment(item)}
                                                        >
                                                            ✏️ Update
                                                        </button>
                                                        <button
                                                            style={{
                                                                padding: "6px 12px",
                                                                background: "#dc3545",
                                                                color: "white",
                                                                border: "none",
                                                                borderRadius: "6px",
                                                                cursor: "pointer"
                                                            }}
                                                            onClick={() => handleDeleteAppointment(item.appointmentId)}
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                        <button
                                                            style={{
                                                                padding: "6px 12px",
                                                                background: "#b86d17",
                                                                color: "white",
                                                                border: "none",
                                                                borderRadius: "6px",
                                                                marginRight: "6px",
                                                                cursor: "pointer"
                                                            }}
                                                            onClick={() => handleFinishAppointment(item.appointmentId)}
                                                        >
                                                            Finish
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Treatment Steps */}
                            <div style={styles.sectionTitle}>
                                <span style={styles.sectionIcon}>🧾</span>
                                Treatment Steps
                            </div>

                            <div style={styles.stepsContainer}>
                                {detail?.stepDetails && detail.stepDetails.length > 0 ? (
                                    <ul style={styles.stepsList}>
                                        {detail.stepDetails.map((step, index) => (
                                            <li key={step.stepId} style={styles.stepItem}>
                                                <div style={styles.stepHeader}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div style={styles.stepNumber}>{index + 1}</div>
                                                        <div style={styles.stepDescription}>{step.description}</div>
                                                    </div>
                                                    <span style={{
                                                        ...styles.stepStatus,
                                                        ...getStepStatusStyle(step.status)
                                                    }}>
                                                        {step.status.trim()}
                                                    </span>
                                                </div>

                                                {step.description && (
                                                    <div style={{
                                                        marginTop: '10px',
                                                        color: '#555',
                                                        lineHeight: 1.5,
                                                        whiteSpace: 'pre-line'
                                                    }}>
                                                        {step.description}
                                                    </div>
                                                )}

                                                <button
                                                    onClick={() => handleFinishStep(step.stepId)}
                                                    style={{
                                                        marginTop: "12px",
                                                        padding: "8px 16px",
                                                        background: "#ffc107",
                                                        color: "#000",
                                                        border: "none",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        marginRight: "20px"
                                                    }}
                                                >
                                                    ✅ Finish
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStep(step.stepId)}
                                                    style={{
                                                        padding: "8px 16px",
                                                        background: "#17a2b8",
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        marginRight: "20px"
                                                    }}
                                                >
                                                    ✏️ Update
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteStep(step.stepId)}
                                                    style={{
                                                        padding: "8px 16px",
                                                        background: "#dc3545",
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "6px",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div style={styles.emptySteps}>
                                        <div style={styles.emptyIcon}>📋</div>
                                        <p>No step details available for this appointment.</p>
                                    </div>
                                )}

                                {/* Luôn hiển thị nút tạo step */}
                                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                    <button
                                        onClick={() => setShowModal(true)}
                                        style={{
                                            padding: "12px 24px",
                                            fontSize: "1rem",
                                            fontWeight: "bold",
                                            color: "white",
                                            background: "#28a745",
                                            border: "none",
                                            borderRadius: "8px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        ➕ Create Step Detail
                                    </button>
                                </div>
                            </div>


                            {(state?.status.trim().toLowerCase() === 'đang chờ' || state?.status === 'pending') && (
                                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label htmlFor="note" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                                            Doctor Note
                                        </label>
                                        <textarea
                                            id="note"
                                            rows={4}
                                            value={noteInput}
                                            onChange={(e) => setNoteInput(e.target.value)}
                                            style={{
                                                width: '100%',
                                                maxWidth: '600px',
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: '1px solid #ccc',
                                                fontSize: '1rem',
                                                resize: 'vertical'
                                            }}
                                        />
                                    </div>

                                    <button
                                        onClick={handleCreateAppointment}
                                        disabled={creating}
                                        style={{
                                            padding: '12px 24px',
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            transition: 'transform 0.2s ease',
                                            transform: creating ? 'scale(0.98)' : 'scale(1)'
                                        }}
                                    >
                                        {creating ? "Creating..." : "Create Appointment"}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            {showModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 999
                    }}
                >
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        width: '90%',
                        maxWidth: '500px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                    }}>
                        <h3 style={{ marginBottom: '15px' }}>Create New Step Detail</h3>
                        <textarea
                            value={stepDescriptionInput}
                            onChange={(e) => setStepDescriptionInput(e.target.value)}
                            rows={4}
                            placeholder="Enter step description..."
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '1rem',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                resize: 'vertical'
                            }}
                        />
                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    marginRight: '10px',
                                    padding: '8px 16px',
                                    background: '#ccc',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateStepDetail}
                                disabled={creatingStep}
                                style={{
                                    padding: '8px 16px',
                                    background: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                {creatingStep ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showUpdateModal && editingStep && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 999
                    }}
                >
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        width: '90%',
                        maxWidth: '500px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                    }}>
                        <h3 style={{ marginBottom: '15px' }}>Update Step Description</h3>
                        <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            rows={4}
                            placeholder="Update step description..."
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '1rem',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                resize: 'vertical'
                            }}
                        />
                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                style={{
                                    marginRight: '10px',
                                    padding: '8px 16px',
                                    background: '#ccc',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmUpdate}
                                style={{
                                    padding: '8px 16px',
                                    background: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showUpdateAppointmentModal && editingAppointment && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 999
                }}>
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        width: '90%',
                        maxWidth: '500px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                    }}>
                        <h3 style={{ marginBottom: '15px' }}>Update Appointment</h3>

                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Date & Time:</label>
                        <input
                            type="datetime-local"
                            value={updatedDate}
                            onChange={(e) => setUpdatedDate(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '15px',
                                borderRadius: '8px',
                                border: '1px solid #ccc'
                            }}
                        />

                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Note:</label>
                        <textarea
                            rows={4}
                            value={updatedNote}
                            onChange={(e) => setUpdatedNote(e.target.value)}
                            placeholder="Update note..."
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                resize: 'vertical'
                            }}
                        />

                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <button
                                onClick={() => setShowUpdateAppointmentModal(false)}
                                style={{
                                    marginRight: '10px',
                                    padding: '8px 16px',
                                    background: '#ccc',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmUpdateAppointment}
                                style={{
                                    padding: '8px 16px',
                                    background: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}



            {/* Spinner animation style */}
            <style>{`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
        </div>
    );
}

export default DoctorAppointmentDetail;
