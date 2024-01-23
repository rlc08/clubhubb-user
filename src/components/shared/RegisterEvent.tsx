import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useUserContext } from "@/context/useUserContext";
import { useRegisterEventMutation } from "@/store/api/eventApi";
import React, { useEffect } from "react";
import { useMediaQuery, createTheme, ThemeProvider } from "@mui/material";

type RegisterEventProps = {
    eventId: string;
};

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "black", // dark background color
            paper: "#222", // darker background color for paper
        },
        primary: {
            main: "#f84464", // your primary color
        },
        text: {
            primary: "#fff", // white text color
        },
    },
});

export default function RegisterEvent(props: RegisterEventProps) {
    const { user } = useUserContext();
    const { eventId } = props;

    const [registerevent] = useRegisterEventMutation();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const [name, setName] = React.useState(user.name);
    const [email, setEmail] = React.useState(user.email);
    const [registrationStatus, setRegistrationStatus] = React.useState<
        "pending" | "success"
    >("pending");

    const isMobile = useMediaQuery("(max-width: 600px)"); // Adjust the breakpoint as needed

    const mobilePopoverPosition = { top: 400, left: 220 };
    const laptopPopoverPosition = { top: 400, left: 870 };

    const popoverPosition = isMobile
        ? mobilePopoverPosition
        : laptopPopoverPosition;

    useEffect(() => {
        if (
            user.eventsRegistered.some(
                (eventObj) => eventObj.eventId === eventId
            )
        ) {
            console.log("success");
            setRegistrationStatus("success");
        }
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const RegisterEventSubmit: React.MouseEventHandler<
        HTMLButtonElement
    > = async (event) => {
        event.preventDefault();

        try {
            // Perform the registration
            await registerevent({ eventId, name, email });

            // Update the registration status upon successful registration
            setRegistrationStatus("success");
        } catch (error) {
            console.error("Error registering event:", error);
        }

        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <ThemeProvider theme={darkTheme}>
            <div>
                {registrationStatus === "pending" ? (
                    <Button
                        aria-describedby={id}
                        variant="contained"
                        className="shad-button_primary"
                        onClick={handleClick}
                    >
                        Register
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#f84464", color: "white" }}
                        disabled
                    >
                        Registered
                    </Button>
                )}
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={popoverPosition}
                    anchorOrigin={{
                        vertical: "center",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "center",
                        horizontal: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            padding: 16,
                        }}
                    >
                        <Typography variant="h6">Register Event</Typography>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={handleNameChange}
                            fullWidth
                            margin="normal"
                            InputProps={{ style: { color: "white" } }}
                        />
                        <TextField
                            label="Email"
                            value={email}
                            onChange={handleEmailChange}
                            fullWidth
                            margin="normal"
                            InputProps={{ style: { color: "white" } }}
                        />
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#f84464" }}
                            onClick={RegisterEventSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </Popover>
            </div>
        </ThemeProvider>
    );
}
