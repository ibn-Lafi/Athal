import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata={title:'محمصة أثل | التحدّي',description:'تحدّي محمصة أثل'};
export const viewport: Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#f7f0e5'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ar" dir="rtl"><body>{children}</body></html>}