import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addProductApi } from "../../services/userApi";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";
import { IProduct } from "../../utils/constants";

const AddProduct: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IProduct>();

    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit: SubmitHandler<IProduct> = async (data) => {
        try {
            setLoading(true)
            const response = await addProductApi(data)
            if (response?.status == 200) {
                const { data } = response
                console.log("Product Added:", data);
                reset();
                onClose();
                setLoading(false)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Success!",
                    text: "Product has been Added successfully :)",
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true,
                }).then(() => {
                    // navigate("/");
                });
            }
        } catch (err) {
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
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="container p-4 shadow rounded bg-white" style={{ maxWidth: "750px", minWidth: "700px" }}>
            <h3 className="mb-3 text-center">Add New Product</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
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
                        placeholder="Enter product name"
                    />
                    {errors.name && <small className="text-danger">{errors.name.message}</small>}
                </div>

                {/* Description Field */}
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        {...register("description", {
                            required: "Description is required", minLength: {
                                value: 10,
                                message: "Name must be at least 10 characters long.",
                            },
                            pattern: {
                                value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                                message: "Name cannot have leading/trailing spaces or multiple spaces between words",
                            },
                        })}
                        placeholder="Enter product description"
                    />
                    {errors.description && <small className="text-danger">{errors.description.message}</small>}
                </div>


                {/* Quantity Field */}
                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        {...register("quantity", {
                            required: "Quantity is required",
                            min: { value: 1, message: "Quantity must be at least 1" }
                        })}
                        placeholder="Enter quantity"
                    />
                    {errors.quantity && <small className="text-danger">{errors.quantity.message}</small>}
                </div>

                {/* Price Field */}
                <div className="mb-3">
                    <label className="form-label">Price ($)</label>
                    <input
                        type="number"
                        className="form-control"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 1, message: "Price must be at least ₹1" }
                        })}
                        placeholder="Enter price"
                    />
                    {errors.price && <small className="text-danger">{errors.price.message}</small>}
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-success d-flex align-items-center justify-content-center" disabled={loading}>
                        {loading ? (
                            <Spinner />
                        ) : (
                            "Add Product"
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddProduct;
