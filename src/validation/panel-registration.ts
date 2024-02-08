import { number, object } from "yup";

interface PanelInitialValuesProps {
     mobile: string;
}

export const PanelInitialValues: PanelInitialValuesProps = {
     mobile: "",
};

export const PanelValidationSchema = object().shape({
     mobile: number().required("mobile number is required for start chat"),
});
