import React from "react";
import { useSnackbar } from "notistack";
import authFetch from "../../axios/Interceptors";


const SevenDayFreeTrialConfirmationModal = ({currentUserDetails}) => {

    const { enqueueSnackbar } = useSnackbar();

 const sendFreetrialRequest = () =>{
    try {
        authFetch
        .post(`/api/free/trail/${currentUserDetails?.userID}/`, {userID: currentUserDetails.userID})
        .then((response)=>{
            const msg = response?.data?.success ? response.data.success : response.data.error;
            enqueueSnackbar(msg, { variant: `${response?.data?.success ? 'success' : 'warning'}`, autoHideDuration: 5000 });
        })
        .catch((e)=>{
            console.log(e);
            const msg = "Something wrong! Please try again!";
            enqueueSnackbar(msg, { variant: "warning", autoHideDuration: 5000 });
        })
    } catch(error) {
            const msg = "Sorry! Your 7-days free trial request is failed! Try again!";
            enqueueSnackbar(msg, { variant: "warning", autoHideDuration: 5000 });
    }
 }

  return (
    <>
      <div
        class="modal fade"
        id="seven_day_free_trial_confirmationModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                What includes in 7-days free trial?
              </h5>
              <button
                type="button"
                class="btn btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                // ref={unsubscribe.closeUnsubcribeConfirmationModalBtn}
                // onClick={()=>unsubscribe.closeUnsubscribeConfirmationModalHanler}
              ></button>
            </div>
            <div class="modal-body">
                <p> You will get seven day free trial with all the paid facilities like a <strong>Pro-Member</strong>. After that you have to upgrade your membership for getting continuous paid
                facilities.</p>

                <p className="text-warning"><strong>Note: </strong>One user get only one free trial in account life time.</p>
            </div>
            <div class="modal-footer">
              {/* <button
                type="button"
                class="btn upgrade-btn"
                data-bs-dismiss="modal"
              >
                No, want to upgrade now
              </button> */}
              <button type="button" 
                data-bs-dismiss="modal"
                //   onClick={()=>unsubscribe.unsubscribe()}
               class="btn change-password-btn"
               onClick={()=>sendFreetrialRequest()}
               >
                Ok, I got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default SevenDayFreeTrialConfirmationModal;