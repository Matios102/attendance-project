import React, { useEffect } from "react";
import Calendar from "../../Features/Calendar/Calendar";
import { MdCalendarMonth } from "react-icons/md";
import StatusInfo from "../../Components/StatusInfo";
import { useSelector } from "react-redux";
import {
  selectCreateClassError,
  selectCreateClassStatus,
  selectGetClassesError,
  selectGetClassesStatus,
  selectRemoveClassError,
  selectRemoveClassStatus,
} from "../../store/slices/Class";
import Page from "../../Components/Page";

function MyClasses() {
  const getClassesStatus = useSelector(selectGetClassesStatus);
  const getClassesError = useSelector(selectGetClassesError);
  const createClassStatus = useSelector(selectCreateClassStatus);
  const createClassError = useSelector(selectCreateClassError);
  const removeClassStatus = useSelector(selectRemoveClassStatus);
  const removeClassError = useSelector(selectRemoveClassError);

  console.log(
    getClassesStatus,
    getClassesError,
    createClassStatus,
    createClassError,
    removeClassStatus,
    removeClassError
  );

  useEffect(() => {
    if (
      createClassStatus === "succeeded" ||
      removeClassStatus === "succeeded"
    ) {
      window.location.reload();
    }
  }, [createClassStatus, removeClassStatus]);

  return (
    <Page>
      <div className="flex items-center space-x-1 text-5xl font-semibold mb-5">
        <h2>Your calendar</h2>
        <MdCalendarMonth />
      </div>
      <StatusInfo key={0} status={getClassesStatus} error={getClassesError} />
      <StatusInfo
        key={2}
        status={removeClassStatus}
        error={removeClassError}
        successMessage="Class removed"
      />
      <StatusInfo
        key={1}
        status={createClassStatus}
        error={createClassError}
        successMessage="Class created"
      />
      <Calendar />
    </Page>
  );
}

export default MyClasses;
