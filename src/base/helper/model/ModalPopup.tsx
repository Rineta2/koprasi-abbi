import React, { useEffect } from 'react'

interface ModalPopupProps {
  onClose: () => void;
}

export default function ModalPopup({ onClose }: ModalPopupProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm p-4' style={{ zIndex: "9999" }}>
      <div className='bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full mx-auto relative shadow-2xl transform transition-all'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className='text-center'>
          <div className='mb-4 sm:mb-6 flex justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className='text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-800'>Preview Template</h2>
          <p className='text-sm sm:text-base text-gray-600 mb-4 sm:mb-6'>
            Nih preview template-nya! Kalo mau pake full version-nya, tinggal chat admin aja ya. Kita bisa ngobrol santai soal pembayarannya 😊
          </p>
          <a
            href="https://wa.me/628139863293"
            target="_blank"
            rel="noopener noreferrer"
            className='inline-flex items-center justify-center bg-green-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.333-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.333 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
            </svg>
            Chat Admin
          </a>
          <div className='mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200'>
            <p className='text-xs sm:text-sm text-gray-500'>
              © {new Date().getFullYear()} All Rights Reserved. Template by <a href="https://spacedigitalia.my.id/" rel='modal popup' className="hover:text-green-500 transition-colors">Space Digitalia</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
