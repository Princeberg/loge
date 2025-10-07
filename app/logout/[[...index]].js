import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useClerk } from '@clerk/nextjs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'lottie-react';
import loadingAnimation from '@/lotties/loading.json';

export default function LogoutPage() {
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      try {
        if (!signOut) {
          toast.error("Impossible de se déconnecter : Clerk non chargé.");
          return;
        }

        await signOut();              
        localStorage.clear();        
        sessionStorage.clear();
        toast.success("Déconnexion réussie !");
        setTimeout(() => {
          router.replace('/');
        }, 1000); 
      } catch (error) {
        toast.error("Une erreur s'est produite lors de la déconnexion.");
        console.error("Logout error:", error);
      }
    };

    doLogout();
  }, [signOut, router]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer />
        <div style={{ width: 150, height: 150 }}>
               <Lottie animationData={loadingAnimation} loop={true} />
             </div>
    </div>
  );
}
