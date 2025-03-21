import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { editCustomerApi } from "../../services/customerApi";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";
import { ICustomer } from "../../utils/constants";

interface EditCustomerProps {
    customer: ICustomer;
    onClose: () => void;
    onUpdateCustomer: (updatedCustomer: ICustomer) => void;
}

const EditCustomer: React.FC<EditCustomerProps> = ({ customer, onClose, onUpdateCustomer }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ICustomer>();

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        reset(customer);
    }, [customer, reset]);

    const onSubmit: SubmitHandler<ICustomer> = async (data) => {
        try {
            setLoading(true);
            const response = await editCustomerApi(customer._id, data);
            if (response?.status === 200) {
                const { data } = response;
                console.log("Customer Updated:", response.data);
                onUpdateCustomer(data.data);
                reset();
                onClose();
                setLoading(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Success!",
                    text: "Customer details have been updated successfully!",
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true,
                });
            }
        } catch (err) {
            setLoading(false);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: (err as Error)?.message || "Something went wrong. Please try again.",
                showConfirmButton: true,
                confirmButtonText: "OK",
                timer: 3000,
                toast: true,
            });
        }
    };

    return (
        <div className="container p-4 shadow rounded bg-white" style={{ maxWidth: "750px", minWidth: "700px" }}>
            <h3 className="mb-3 text-center">Edit Customer</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        className="form-control"
                        {...register("name", {
                            required: "Full name is required",
                            minLength: {
                                value: 4,
                                message: "Name must be at least 4 characters long.",
                            },
                            pattern: {
                                value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                                message: "Name cannot have leading/trailing spaces or multiple spaces between words",
                            },
                        })}
                        placeholder="Enter name"
                    />
                    {errors.name && <small className="text-danger">{errors.name.message}</small>}
                </div>

                {/* Address Field */}
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
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
                        placeholder="Enter address"
                    />
                    {errors.address && <small className="text-danger">{errors.address.message}</small>}
                </div>

                {/* Phone Field */}
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Phone number must be exactly 10 digits",
                            },
                        })}
                        placeholder="Enter phone number"
                    />
                    {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary d-flex align-items-center justify-content-center" disabled={loading}>
                        {loading ? <Spinner /> : "Update Customer"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCustomer;
