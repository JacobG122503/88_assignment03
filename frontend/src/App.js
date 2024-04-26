import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [viewer, setViewer] = useState(0);

  const [myProducts, setMyProducts] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function Create() {
    const createNewProduct = (data) => {
      setMyProducts([...myProducts, data]);
      console.log("Creating new product");
      fetch("http://localhost:8081/addProduct", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: data.id,
          title: data.title,
          price: data.price,
          description: data.description,
          image: data.image,
          category: data.category,
          rating: {
            rate: data.rating,
            count: data.ratingCount,
          },
        }),
      })
        .then((response) => response.json())
        .then((newProduct) => {
          console.log(newProduct);
        });
    };

    return (
      <form
        onSubmit={handleSubmit(createNewProduct)}
        className="container mt-5"
        id="paymentForm"
      >
        <div className="form-group">
          <p>ID</p>
          <input
            {...register("id", { required: true })}
            placeholder=""
            className="form-control"
            id="id"
          />
        </div>

        <div className="form-group">
          <p>Title</p>
          <input
            {...register("title", { required: true })}
            placeholder=""
            className="form-control"
          />
        </div>

        <div className="form-group">
          <p>Price </p>
          <input
            {...register("price", { required: true })}
            placeholder=""
            className="form-control"
          />
        </div>

        <div className="form-group">
          <p>Description</p>
          <input
            {...register("description", { required: true })}
            placeholder=""
            className="form-control"
          />
        </div>

        <div className="form-group">
          <p>Image URL</p>
          <input
            {...register("image")}
            placeholder=""
            className="form-control"
          />
        </div>

        <div className="form-group">
          <p>Category</p>
          <input
            {...register("category")}
            placeholder=""
            className="form-control"
          />
        </div>

        <div className="form-group">
          <p>Rating </p>
          <input
            {...register("rating", { required: true })}
            placeholder=""
            className="form-control"
          />

          <p>Rating Count</p>
          <input
            {...register("ratingCount", { required: true })}
            placeholder=""
            className="form-control"
          />
        </div>

        <br />
        <button type="submit" className="btn btn-secondary">
          Create Product
        </button>
        <br />
      </form>
    );
  }

  function Read() {
    useEffect(() => {
      fetch("http://localhost:8081/products")
        .then((response) => response.json())
        .then((products) => {
          setMyProducts(products);
        });
    }, []);

    const ShowProducts = () => {
      return (
        <div className="container mt-3">
          <div className="row">
            {myProducts.map((product) => (
              <div
                key={product.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <div className="card">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text"> ${product.price}</p>
                    <p className="card-text">
                      <em>{product.category}</em> <br /> {product.description}
                    </p>
                    <p className="card-text">
                      {product.rating.rate}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      , {product.rating.count} reviews
                    </p>
                    <p>ID: {product.id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div>
        <ShowProducts />
      </div>
    );
  } // end of function

  function Update() {

    const [updatedProduct, setUpdatedProduct] = useState([]);
    const [toUpdate, setToUpdate] = useState(0);

    const UpdateProducts = () => {
      return (
        <div className="container mt-3">
        <div className="row">
          <div
            key={updatedProduct.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          >
            <div className="card">
              <img
                src={updatedProduct.image}
                className="card-img-top"
                alt={updatedProduct.title}
              />
              <div className="card-body">
                <h5 className="card-title">{updatedProduct.title}</h5>
                <p className="card-text"> ${updatedProduct.price}</p>
                <p className="card-text">
                  <em>{updatedProduct.category}</em> <br />{" "}
                  {updatedProduct.description}
                </p>
              </div>
              <input type="number" id="new-price" placeholder="new price"></input>
              <button type="button" onClick={UpdatePrice}>
                Update Price
              </button>
            </div>
          </div>
        </div>
      </div>
      )
    }

    const UpdatePrice = () => {

      var id = document.getElementById("product-to-update").value;
      var price_ = document.getElementById("new-price").value;

      fetch(`http://localhost:8081/updateProduct/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
       price: price_
      }),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        console.log(updatedProduct);
        setToUpdate(0);
      });
    }

    const getUpdate = () => {
      var id = document.getElementById("product-to-update").value;
      console.log(id);

      fetch(`http://localhost:8081/products/${id}`)
        .then((response) => response.json())
        .then((productToUpdate) => {
          setToUpdate(1);
          setUpdatedProduct(productToUpdate);
        });
    }
 
    return (
      <div>
        <h3>Enter a product id number to update: </h3>
        <input type="number" id="product-to-update"></input>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={getUpdate}
        >
          Update
        </button>
        {toUpdate === 1 && <UpdateProducts />}
      </div>
    );
  }

  function Delete() {
    const [deletedProduct, setDeletedProduct] = useState([]);
    const [toDelete, setToDelete] = useState(0);

    const DeleteProducts = () => {
      console.log(`${deletedProduct}`);

      return (
        <div className="container mt-3">
          <div className="row">
            <div
              key={deletedProduct.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <div className="card">
                <img
                  src={deletedProduct.image}
                  className="card-img-top"
                  alt={deletedProduct.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{deletedProduct.title}</h5>
                  <p className="card-text"> ${deletedProduct.price}</p>
                  <p className="card-text">
                    <em>{deletedProduct.category}</em> <br />{" "}
                    {deletedProduct.description}
                  </p>
                </div>
                <button type="button" onClick={Deleted}>
                  Confirm Delete
                </button>
                <button type="button" onClick={CancelDelete}>
                  Cancel Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    //show product to delete before actually deleting it
    const confirmDelete = () => {
      var id = document.getElementById("product-to-delete").value;
      console.log(id);

      fetch(`http://localhost:8081/products/${id}`)
        .then((response) => response.json())
        .then((productToDelete) => {
          console.log(`PRO: ${productToDelete.title}`);
          setToDelete(1);
          setDeletedProduct(productToDelete);
        });
    };

    const Deleted = () => {
      var id = document.getElementById("product-to-delete").value;

      fetch(`http://localhost:8081/deleteProduct/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: id }),
      })
        .then((response) => response.json())
        .then((deleteThisproduct) => {
          console.log(deleteThisproduct);
        });

      setToDelete(0);
    };

    const CancelDelete = () => {
      setToDelete(0);
    };

    return (
      <div>
        <h3>Enter a product id number to delete: </h3>
        <input type="number" id="product-to-delete"></input>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={confirmDelete}
        >
          Delete
        </button>
        {toDelete === 1 && <DeleteProducts />}
      </div>
    );
  }

  const viewCreate = () => {
    setViewer(0);
  };

  const viewRead = () => {
    setViewer(1);
  };

  const viewUpdate = () => {
    setViewer(2);
  };

  const viewDelete = () => {
    setViewer(3);
  };

  return (
    <div>
      <header data-bs-theme="dark">
        <div class="navbar navbar-dark bg-dark shadow-sm">
          <div class="container">
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewCreate}
            >
              Create
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewRead}
            >
              Read
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewUpdate}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </header>
      {viewer === 0 && <Create />}
      {viewer === 1 && <Read />}
      {viewer === 2 && <Update />}
      {viewer == 3 && <Delete />}
    </div>
  );
}

export default App;
