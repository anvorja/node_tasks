import React from 'react';
import { CheckSquare } from 'lucide-react';

const Header = ({ title = "TaskMaster Pro", subtitle }) => {
  return (
    <div className="mb-12 text-center">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
          <CheckSquare className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>

      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        {subtitle || (
          <>
            Organiza, prioriza y completa tus tareas con estilo.
            <span className="font-semibold text-blue-600"> ¡Tu productividad, optimizada!</span>
          </>
        )}
      </p>
    </div>
  );
};

export default Header;