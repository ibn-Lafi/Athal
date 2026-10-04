const securityHeaders=[
 {key:'X-Content-Type-Options',value:'nosniff'},
 {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
 {key:'X-Frame-Options',value:'DENY'},
 {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
 {key:'Content-Security-Policy',value:"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://raw.githubusercontent.com; connect-src 'self' https://finwrdhrynhrhgekihoq.supabase.co wss://finwrdhrynhrhgekihoq.supabase.co; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"}
];
const nextConfig={async headers(){return[{source:'/:path*',headers:securityHeaders}]}};
export default nextConfig;
