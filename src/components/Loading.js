import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className=" w-full h-[100vh] dark:bg-[--black] dark:bg-opacity-4 flex justify-center items-center">
      <div className="m-5 mx-auto">
        <Spinner animation="border" role="status" style={{
          color: "#F13B48", width: "70px",
          height: "70px"
        }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
};

export default Loading;
