import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export const socialIcons: Record<string, React.ReactNode> = {
  Facebook: <FaFacebook className="w-4 h-4" />,
  Instagram: <FaInstagram className="w-4 h-4" />,
  LinkedIn: <FaLinkedin className="w-4 h-4" />,
};

export const socialIconsLarge: Record<string, React.ReactNode> = {
  Facebook: <FaFacebook className="w-6 h-6" />,
  Instagram: <FaInstagram className="w-6 h-6" />,
  LinkedIn: <FaLinkedin className="w-6 h-6" />,
};
