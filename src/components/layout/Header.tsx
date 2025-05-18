import React from 'react';
import { Banknote } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg backdrop-blur-sm">
              <Banknote className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">CreditoPro</h1>
              <p className="text-blue-100 text-sm">Financiamiento rápido y seguro</p>
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="flex space-x-8">
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 px-3 py-2 text-sm font-medium">
                Inicio
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 px-3 py-2 text-sm font-medium">
                Productos
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 px-3 py-2 text-sm font-medium">
                Preguntas Frecuentes
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 px-3 py-2 text-sm font-medium">
                Contacto
              </a>
            </nav>
          </div>
          <div className="hidden md:block">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
              Iniciar Sesión
            </button>
          </div>
          <div className="md:hidden">
            <button type="button" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;