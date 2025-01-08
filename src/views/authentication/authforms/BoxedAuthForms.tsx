import { useContext, useState } from "react";
import { Button, Checkbox, Label, TextInput,Modal } from "flowbite-react";
import { Link, useNavigate } from "react-router";
import { Login } from "src/utils/api";
import { AuthContext } from "src/context/AuthContext";

const BoxedAuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const context =useContext(AuthContext)
  const {setIsLoggedIn } = context;
  const [openDialog,setOpenDialog]=useState(false);


  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
    }

    try {
      await Login(
        email,
        password,
        () => {
          // alert("Login successful!");
          setIsLoggedIn(true);
          localStorage.setItem('isLoggedIn', "true");
          setOpenDialog(false);
          navigate("/"); // Redirect to the desired route
        },
        () => {
          //alert("Login failed. Please check your credentials.");
          setOpenDialog(true);
        }
      );
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleCloseDialog=()=>{
    setOpenDialog(false);
  }
  return (
    <>
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email Address" />
          </div>
          <TextInput
            id="email"
            type="text"
            sizing="md"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="userpwd" value="Password" />
            {/* <Link className="text-xs text-primary" to={'/auth/auth2/forgot-password'}>
              Forgot Password ?
            </Link> */}
          </div>
          <TextInput
            id="userpwd"
            type="password"
            sizing="md"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between my-5">
          {/* <div className="flex items-center gap-2">
            <Checkbox id="accept" className="checkbox" defaultChecked />
            <Label htmlFor="accept" className="font-medium cursor-pointer">
              Keep me logged in
            </Label>
          </div> */}
        </div>
        <Button
          type="submit"
          className="rounded-md w-full bg-sky dark:bg-sky hover:bg-dark dark:hover:bg-dark"
        >
          Sign in
        </Button>
      </form>
      <Modal show={openDialog} onClose={handleCloseDialog} size={"md"}>
        <Modal.Body>
          <p className="text-center text-lg text-ld">
          Login failed. Please check your credentials.
         </p>
        </Modal.Body>
        <Modal.Footer className="mx-auto">
          <Button color="lighterror" onClick={handleCloseDialog}>
            Ok
          </Button>
                      
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BoxedAuthLogin;
