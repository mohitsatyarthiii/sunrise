import { Suspense } from 'react'
import PaymentSuccessContent from './SuccessContent'  // ✅ Default import

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-0 shadow-sm bg-white p-8 text-center rounded-lg">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}