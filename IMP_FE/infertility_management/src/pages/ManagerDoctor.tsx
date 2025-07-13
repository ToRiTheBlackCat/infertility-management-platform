import React, { useEffect, useState } from "react";
import {
    fetchDoctor,
    createDoctorManager,
    updateDoctorManager,
    fetchExpertField,
    createDoctorExpertField
} from "../service/authService";
import {
    DoctorData,
    createDoctor,
    updateDoctorData,
} from "../types/common";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ManagerDoctor: React.FC = () => {
    const [doctorList, setDoctorList] = useState<DoctorData[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showExpertModal, setShowExpertModal] = useState(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
    const [expertFieldList, setExpertFieldList] = useState<any[]>([]);
    const [selectedExpertFieldId, setSelectedExpertFieldId] = useState<number | null>(null);

    const [createDoctorForm, setCreateDoctorForm] = useState<createDoctor>({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        doctorImage: {} as File,
        yearOfBirth: new Date().getFullYear(),
        phoneNumber: "",
        gender: "",
        address: "",
        degree: "",
    });

    const [updateDoctorForm, setUpdateDoctorForm] = useState<updateDoctorData>({
        doctorId: 0,
        fullName: "",
        yearOfBirth: new Date().getFullYear(),
        phoneNumber: "",
        gender: "",
        address: "",
        degree: "",
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetchDoctor();
        if (response) setDoctorList(response);
    };

    const handleCreateChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, files } = e.target as any;
        if (name === "doctorImage") {
            setCreateDoctorForm({ ...createDoctorForm, doctorImage: files[0] });
        } else {
            setCreateDoctorForm({ ...createDoctorForm, [name]: value });
        }
    };

    const handleUpdateChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setUpdateDoctorForm({ ...updateDoctorForm, [name]: value });
    };

    const handleCreate = async () => {
        console.log(createDoctorForm)
        const result = await createDoctorManager(createDoctorForm);
        if (result) {
            alert("Doctor created successfully!");
            fetchData();
            setShowCreateModal(false);
        }
    };

    const handleUpdate = async () => {
        const result = await updateDoctorManager(updateDoctorForm);
        if (result) {
            alert("Doctor updated successfully!");
            fetchData();
            setShowUpdateModal(false);
        }
    };

    const handleEditClick = (doctor: updateDoctorData) => {
        setUpdateDoctorForm({
            doctorId: doctor.doctorId,
            fullName: doctor.fullName,
            yearOfBirth: doctor.yearOfBirth,
            phoneNumber: doctor.phoneNumber,
            gender: doctor.gender,
            address: doctor.address,
            degree: doctor.degree,
        });
        setShowUpdateModal(true);
    };
    const handleOpenExpertModal = async (doctorId: number) => {
        setSelectedDoctorId(doctorId);
        const response = await fetchExpertField();
        if (response) {
            setExpertFieldList(response);
            setShowExpertModal(true);
        }
    };

    const handleSelectExpertField = async (expertFieldId: number) => {
        if (!selectedDoctorId) return;
        const result = await createDoctorExpertField(selectedDoctorId, expertFieldId);
        if (result) {
            toast("Expert field added successfully!");
            setShowExpertModal(false);
            setSelectedDoctorId(null);
        }
    };

    // Inline CSS styles
    const containerStyle = {
        padding: '30px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
    };

    const headerStyle = {
        color: '#2c3e50',
        marginBottom: '25px',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center' as const,
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
    };

    const createButtonStyle = {
        backgroundColor: '#28a745',
        borderColor: '#28a745',
        padding: '12px 30px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        marginBottom: '20px'
    };

    const doctorListStyle = {
        listStyle: 'none',
        padding: '0',
        margin: '20px 0'
    };

    const doctorItemStyle = {
        backgroundColor: '#ffffff',
        padding: '20px',
        margin: '10px 0',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e9ecef',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    };

    const doctorInfoStyle = {
        fontSize: '1.1rem',
        color: '#495057',
        fontWeight: '500'
    };

    const editButtonStyle = {
        backgroundColor: '#ffc107',
        borderColor: '#ffc107',
        color: '#212529',
        padding: '8px 16px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        borderRadius: '6px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
    };

    const modalHeaderStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '8px 8px 0 0'
    };

    const modalBodyStyle = {
        padding: '25px',
        backgroundColor: '#f8f9fa'
    };

    const formControlStyle = {
        marginBottom: '15px',
        padding: '12px',
        fontSize: '1rem',
        borderRadius: '8px',
        border: '2px solid #dee2e6',
        transition: 'border-color 0.3s ease'
    };

    const modalFooterStyle = {
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #dee2e6',
        padding: '15px 25px'
    };

    const buttonSuccessStyle = {
        backgroundColor: '#28a745',
        borderColor: '#28a745',
        padding: '10px 20px',
        fontSize: '1rem',
        fontWeight: 'bold',
        borderRadius: '6px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    const buttonSecondaryStyle = {
        backgroundColor: '#6c757d',
        borderColor: '#6c757d',
        padding: '10px 20px',
        fontSize: '1rem',
        fontWeight: 'bold',
        borderRadius: '6px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginRight: '10px'
    };

    const buttonPrimaryStyle = {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        padding: '10px 20px',
        fontSize: '1rem',
        fontWeight: 'bold',
        borderRadius: '6px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Doctor Management System</h2>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <Button
                    variant="primary"
                    onClick={() => setShowCreateModal(true)}
                    style={createButtonStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }}
                >
                    + Create New Doctor
                </Button>
            </div>

            <ul style={doctorListStyle}>
                {doctorList.map((doc) => (
                    <li
                        key={doc.doctorId}
                        style={doctorItemStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div style={doctorInfoStyle}>
                            <strong>{doc.fullName}</strong> ({doc.degree}) - <em>{doc.gender}</em>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Button
                                variant="warning"
                                size="sm"
                                style={editButtonStyle}
                                onClick={() => handleEditClick({
                                    doctorId: doc.doctorId,
                                    fullName: doc.fullName,
                                    yearOfBirth: doc.yearOfBirth,
                                    phoneNumber: doc.phoneNumber,
                                    gender: doc.gender,
                                    degree: doc.degree,
                                    address: doc.address
                                })}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#e0a800';
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#ffc107';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                ✏️ Edit
                            </Button>
                            <Button
                                variant="info"
                                size="sm"
                                style={buttonSecondaryStyle}
                                onClick={async () => {
                                    setSelectedDoctorId(doc.doctorId);
                                    const data = await fetchExpertField();
                                    if (data) {
                                        setExpertFieldList(data);
                                        setShowExpertModal(true);
                                    }
                                }}
                            >
                                ➕ Expert Field
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
            <Modal show={showExpertModal} onHide={() => setShowExpertModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Expert Field</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Select Expert Field</Form.Label>
                        <Form.Select
                            value={selectedExpertFieldId ?? ""}
                            onChange={(e) => setSelectedExpertFieldId(Number(e.target.value))}
                        >
                            <option value="">-- Choose an expert field --</option>
                            {expertFieldList.map(field => (
                                <option key={field.expertFieldId} value={field.expertFieldId}>
                                    {field.expertFieldName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowExpertModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        disabled={!selectedDoctorId || !selectedExpertFieldId}
                        onClick={async () => {
                            const result = await createDoctorExpertField(selectedDoctorId!, selectedExpertFieldId!);
                            if (result) {
                                alert("Expert field assigned successfully!");
                                setShowExpertModal(false);
                                setSelectedExpertFieldId(null);
                            }
                        }}
                    >
                        ➕ Create
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* Create Modal */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
                <Modal.Header closeButton style={modalHeaderStyle}>
                    <Modal.Title>👨‍⚕️ Create New Doctor</Modal.Title>
                </Modal.Header>
                <Modal.Body style={modalBodyStyle}>
                    <Form>
                        <Form.Control
                            name="email"
                            placeholder="📧 Email Address"
                            onChange={handleCreateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="🔒 Password"
                            onChange={handleCreateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="confirmPassword"
                            type="password"
                            placeholder="🔒 Confirm Password"
                            onChange={handleCreateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="fullName"
                            placeholder="👤 Full Name"
                            onChange={handleCreateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="yearOfBirth"
                            type="number"
                            placeholder="🎂 Year of Birth"
                            onChange={handleCreateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="phoneNumber"
                            placeholder="📱 Phone Number"
                            onChange={handleCreateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="gender"
                            placeholder="👥 Gender"
                            onChange={handleCreateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="address"
                            placeholder="🏠 Address"
                            onChange={handleCreateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="degree"
                            placeholder="🎓 Degree"
                            onChange={handleCreateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="doctorImage"
                            type="file"
                            onChange={handleCreateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer style={modalFooterStyle}>
                    <Button
                        variant="secondary"
                        onClick={() => setShowCreateModal(false)}
                        style={buttonSecondaryStyle}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleCreate}
                        style={buttonSuccessStyle}
                    >
                        ✅ Create Doctor
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} size="lg">
                <Modal.Header closeButton style={modalHeaderStyle}>
                    <Modal.Title>✏️ Update Doctor Information</Modal.Title>
                </Modal.Header>
                <Modal.Body style={modalBodyStyle}>
                    <Form>
                        <Form.Control
                            name="fullName"
                            value={updateDoctorForm.fullName}
                            placeholder="👤 Full Name"
                            onChange={handleUpdateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="yearOfBirth"
                            type="number"
                            value={updateDoctorForm.yearOfBirth}
                            placeholder="🎂 Year of Birth"
                            onChange={handleUpdateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="phoneNumber"
                            value={updateDoctorForm.phoneNumber}
                            placeholder="📱 Phone Number"
                            onChange={handleUpdateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="gender"
                            value={updateDoctorForm.gender}
                            placeholder="👥 Gender"
                            onChange={handleUpdateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="address"
                            value={updateDoctorForm.address}
                            placeholder="🏠 Address"
                            onChange={handleUpdateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                        <Form.Control
                            name="degree"
                            value={updateDoctorForm.degree}
                            placeholder="🎓 Degree"
                            onChange={handleUpdateChange}
                            style={formControlStyle}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer style={modalFooterStyle}>
                    <Button
                        variant="secondary"
                        onClick={() => setShowUpdateModal(false)}
                        style={buttonSecondaryStyle}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleUpdate}
                        style={buttonPrimaryStyle}
                    >
                        💾 Update Doctor
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManagerDoctor;