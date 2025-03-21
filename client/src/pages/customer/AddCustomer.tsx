import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { addCustomerApi } from "../../services/customerApi";
import { ICustomer } from "../../utils/constants";
import Spinner from "../../components/Spinner";


interface AddCustomerProps {
    onClose: () => void;
}

const AddCustomer: React.FC<AddCustomerProps> = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ICustomer>();

    const [loading, setLoading] = useState<boolean>(false)


    const onSubmit = async (data: ICustomer) => {
        try {
            setLoading(true)
            console.log("Customer Data Submitted:", data);
            const response = await addCustomerApi(data)
            if (response?.status == 200) {
                const { data } = response
                console.log("Customer Added:", data);
                reset();
                onClose();
                setLoading(false)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Success!",
                    text: "Customer has been Added successfully :)",
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true,
                }).then(() => {
                    // navigate("/");
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: (error as Error).message || "Something went wrong. Please try again.",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="container p-4 shadow rounded bg-white" style={{ maxWidth: "750px", minWidth: "700px" }}>
            <h2 className="mb-3">Add Customer</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        {...register('name', {
                            required: 'Name is required', minLength: {
                                value: 4,
                                message: "Name must be at least 4 characters long.",
                            },
                            pattern: {
                                value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                                message: "Name cannot have leading/trailing spaces or multiple spaces between words",
                            },
                        })}
                        placeholder="Enter customer name"

                    />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        {...register("address", {
                            required: "Address is required", minLength: {
                                value: 10,
                                message: "Address must be at least 10 characters long.",
                            },
                            pattern: {
                                value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                                message: "Address cannot have leading/trailing spaces or multiple spaces between words",
                            },
                        })}
                        placeholder="Enter address" />
                    {errors.address && <p className="text-danger">{errors.address.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input
                        type="text"
                        className="form-control"
                        {...register("phone", {
                            required: "Mobile number is required",
                            pattern: {
                                value: /^\d{10}$/,
                                message: "Invalid mobile number (10 digits required)"
                            }
                        })}
                    />
                    {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                </div>

                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn btn-success d-flex align-items-center justify-content-center" disabled={loading}>
                        {loading ? (
                            <Spinner />
                        ) : (
                            "Add Customer"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomer;
