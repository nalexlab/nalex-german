import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminBookingRequests from "@/components/AdminBookingRequests";
import { getAdminBookingRequests } from "@/lib/admin-courses";

export const metadata = { title: "Booking Requests" };
export const dynamic = "force-dynamic";
export default async function BookingRequestsPage() { const requests = await getAdminBookingRequests(); return <><Navbar/><main className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><AdminBookingRequests requests={requests}/></main><Footer/></>; }
