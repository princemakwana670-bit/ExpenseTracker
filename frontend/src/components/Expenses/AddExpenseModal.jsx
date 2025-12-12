import React from "react";

const AddExpenseModal = () => {
  return (
    <>
      {/* Add Expense Button */}
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addExpenseModal"
      >
       + Add Expense
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="addExpenseModal"
        tabIndex="-1"
        aria-labelledby="addExpenseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="addExpenseModalLabel">Add New Expense</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" placeholder="e.g. Grocery" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input type="number" className="form-control" placeholder="e.g. 500" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select className="form-select">
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Shopping</option>
                    <option>Bills</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-control" />
                </div>

              </form>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-primary">
                Save Expense
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpenseModal;
