import React, { useEffect, useState } from "react";
import {
    fetchDoctor,
    createDoctorManager,
    updateDoctorManager,
} from "../service/authService";
import {
    DoctorData,
    createDoctor,
    updateDoctorData,
} from "../types/common";
import { Modal, Button, Form, FormControlProps } from "react-bootstrap";

const ManagerDoctor: React.FC = () => {
    const [doctorList, setDoctorList] = useState<DoctorData[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

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

    return (
        <div className="container py-4">
            <h2>Doctor Management</h2>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                Create Doctor
            </Button>

            <ul className="mt-4">
                {doctorList.map((doc) => (
                    <li key={doc.doctorId}>
                        {doc.fullName} ({doc.degree}) - {doc.gender}
                        <Button
                            variant="warning"
                            className="ms-2"
                            size="sm"
                            onClick={() => handleEditClick({
                                doctorId: doc.doctorId,
                                fullName: doc.fullName,
                                yearOfBirth: doc.yearOfBirth,
                                phoneNumber: doc.phoneNumber,
                                gender: doc.gender,
                                degree: doc.degree,
                                address: doc.address
                            })
                        }
            >
                        Edit
                    </Button>
          </li>
        ))}
        </ul>

      {/* Create Modal */ }
    <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Create Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control name="email" placeholder="Email" onChange={handleCreateChange} className="mb-2" />
                <Form.Control name="password" type="password" placeholder="Password" onChange={handleCreateChange} className="mb-2" />
                <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleCreateChange} className="mb-2" />
                <Form.Control name="fullName" placeholder="Full Name" onChange={handleCreateChange} className="mb-2" />
                <Form.Control name="yearOfBirth" type="number" placeholder="Year of Birth" onChange={handleCreateChange} className="mb-2" />
                <Form.Control name="phoneNumber" placeholder="Phone Number" onChange={handleCreateChange} className="mb-2" />
                <Form.Control name="gender" placeholder="Gender" onChange={handleCreateChange} className="mb-2" />
                <Form.Control name="address" placeholder="Address" onChange={handleCreateChange} className="mb-2" />
                <Form.Control name="degree" placeholder="Degree" onChange={handleCreateChange} className="mb-2" />
                <Form.Control name="doctorImage" type="file" onChange={handleCreateChange} className="mb-2" />
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                Cancel
            </Button>
            <Button variant="success" onClick={handleCreate}>
                Create
            </Button>
        </Modal.Footer>
    </Modal>

    {/* Update Modal */ }
    <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Update Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control name="fullName" value={updateDoctorForm.fullName} placeholder="Full Name" onChange={handleUpdateChange} className="mb-2" />
                <Form.Control name="yearOfBirth" type="number" value={updateDoctorForm.yearOfBirth} placeholder="Year of Birth" onChange={handleUpdateChange} className="mb-2" />
                <Form.Control name="phoneNumber" value={updateDoctorForm.phoneNumber} placeholder="Phone Number" onChange={handleUpdateChange} className="mb-2" />
                <Form.Control name="gender" value={updateDoctorForm.gender} placeholder="Gender" onChange={handleUpdateChange} className="mb-2" />
                <Form.Control name="address" value={updateDoctorForm.address} placeholder="Address" onChange={handleUpdateChange} className="mb-2" />
                <Form.Control name="degree" value={updateDoctorForm.degree} placeholder="Degree" onChange={handleUpdateChange} className="mb-2" />
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
                Update
            </Button>
        </Modal.Footer>
    </Modal>
    </div >
  );
};

export default ManagerDoctor;
