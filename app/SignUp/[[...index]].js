// pages/SignUp.js
import { SignUp } from '@clerk/nextjs';
import { frFR } from '@clerk/localizations';
import { motion } from 'framer-motion';
import Header from '@/components/Header2';

export default function SignUpPage() {
  return (
    <>
      <Header />
      <div className="auth-wrapper">
        {/* Formes géométriques en arrière-plan */}
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
          <div className="shape shape-6"></div>
          <div className="shape shape-7"></div>
          <div className="shape shape-8"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="auth-box"
        >
          <SignUp
            path="/SignUp"
            routing="path"
            signInUrl="/SignIn"
            afterSignUpUrl="/complete-signup"
            localization={frFR}
          />
        </motion.div>
      </div>

      <style jsx>{`
        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f6f9ff 0%, #ffffff 50%, #f0f7f0 100%);
          position: relative;
          overflow: hidden;
        }

        .background-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          animation: appearDisappear 12s infinite ease-in-out;
        }

        /* Formes vertes #4CAF50 */
        .shape-1 {
          width: 120px;
          height: 120px;
          background: #4CAF50;
          top: 15%;
          left: 8%;
          animation-delay: 0s;
        }

        .shape-3 {
          width: 80px;
          height: 80px;
          background: #4CAF50;
          top: 65%;
          left: 12%;
          animation-delay: 2s;
        }

        .shape-5 {
          width: 150px;
          height: 150px;
          background: #4CAF50;
          top: 35%;
          right: 10%;
          animation-delay: 4s;
        }

        .shape-7 {
          width: 100px;
          height: 100px;
          background: #4CAF50;
          bottom: 25%;
          right: 18%;
          animation-delay: 6s;
        }

        /* Formes blanches */
        .shape-2 {
          width: 90px;
          height: 90px;
          background: white;
          top: 25%;
          right: 15%;
          animation-delay: 1s;
        }

        .shape-4 {
          width: 60px;
          height: 60px;
          background: white;
          bottom: 20%;
          left: 25%;
          animation-delay: 3s;
        }

        .shape-6 {
          width: 110px;
          height: 110px;
          background: white;
          top: 55%;
          right: 8%;
          animation-delay: 5s;
        }

        .shape-8 {
          width: 70px;
          height: 70px;
          background: white;
          top: 20%;
          left: 30%;
          animation-delay: 7s;
        }

        .auth-box {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 1.5rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 1;
        }

        @keyframes appearDisappear {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(50px);
          }
          15% {
            opacity: 0.3;
            transform: scale(1) translateY(0);
          }
          30% {
            opacity: 0.5;
            transform: scale(1.1) translateY(-10px);
          }
          45% {
            opacity: 0.3;
            transform: scale(1) translateY(0);
          }
          60% {
            opacity: 0.1;
            transform: scale(0.9) translateY(10px);
          }
          75% {
            opacity: 0;
            transform: scale(0.5) translateY(50px);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) translateY(50px);
          }
        }

        /* Variantes d'animation pour plus de naturel */
        .shape-1, .shape-5 {
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .shape-2, .shape-6 {
          animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }

        .shape-3, .shape-7 {
          animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .shape-4, .shape-8 {
          animation-timing-function: cubic-bezier(0.87, 0, 0.13, 1);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .auth-wrapper {
            padding: 1rem;
          }

          .auth-box {
            padding: 1.5rem;
            margin: 0 1rem;
            max-width: 100%;
          }

          .shape {
            animation-duration: 10s;
          }

          .shape-1 {
            width: 80px;
            height: 80px;
            top: 8%;
            left: 3%;
          }

          .shape-2 {
            width: 60px;
            height: 60px;
            top: 20%;
            right: 8%;
          }

          .shape-3 {
            width: 70px;
            height: 70px;
            top: 70%;
            left: 8%;
          }

          .shape-4 {
            width: 40px;
            height: 40px;
            bottom: 15%;
            left: 20%;
          }

          .shape-5 {
            width: 100px;
            height: 100px;
            top: 30%;
            right: 5%;
          }

          .shape-6 {
            width: 80px;
            height: 80px;
            top: 60%;
            right: 3%;
          }

          .shape-7 {
            width: 70px;
            height: 70px;
            bottom: 20%;
            right: 12%;
          }

          .shape-8 {
            width: 50px;
            height: 50px;
            top: 15%;
            left: 25%;
          }
        }

        @media (max-width: 480px) {
          .auth-box {
            padding: 1.25rem;
            border-radius: 1rem;
          }

          .shape {
            animation-duration: 8s;
          }

          /* Réduire le nombre de formes sur mobile */
          .shape-4, .shape-7, .shape-8 {
            display: none;
          }

          .shape-1, .shape-2, .shape-3, .shape-5, .shape-6 {
            opacity: 0.2;
          }
        }

        @media (min-width: 1200px) {
          .auth-box {
            max-width: 450px;
            padding: 2.5rem;
          }

          .shape-1 {
            width: 150px;
            height: 150px;
          }

          .shape-2 {
            width: 110px;
            height: 110px;
          }

          .shape-3 {
            width: 100px;
            height: 100px;
          }

          .shape-5 {
            width: 180px;
            height: 180px;
          }

          .shape-6 {
            width: 130px;
            height: 130px;
          }
        }

        /* Support pour les très petits écrans */
        @media (max-width: 320px) {
          .auth-wrapper {
            padding: 0.5rem;
          }

          .auth-box {
            padding: 1rem;
            margin: 0.5rem;
          }

          .shape {
            animation-duration: 6s;
          }

          /* Encore moins de formes sur très petits écrans */
          .shape-3, .shape-5, .shape-6 {
            display: none;
          }
        }

        /* Amélioration de l'accessibilité */
        @media (prefers-reduced-motion: reduce) {
          .shape {
            animation: none;
            opacity: 0.1;
          }
        }

        /* Animation pour les préférences de mouvement réduit */
        @media (prefers-reduced-motion: reduce) {
          .shape {
            animation: fadeInOut 20s infinite ease-in-out;
          }
          
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.2; }
          }
        }
      `}</style>
    </>
  );
}