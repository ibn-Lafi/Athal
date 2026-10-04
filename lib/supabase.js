import {createClient} from '@supabase/supabase-js';

let client;
export function getSupabase(){
 if(client)return client;
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)throw new Error('Supabase public configuration is missing');
 client=createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
 return client;
}
export function normalizeSaudiPhone(value=''){
 const digits=value.replace(/\D/g,'');
 if(/^05\d{8}$/.test(digits))return '+966'+digits.slice(1);
 if(/^5\d{8}$/.test(digits))return '+966'+digits;
 if(/^9665\d{8}$/.test(digits))return '+'+digits;
 return null;
}
export function friendlyError(error){
 const m=String(error?.message||'');
 if(m.includes('rate')||m.includes('429'))return 'طلبات كثيرة، حاول بعد قليل.';
 if(m.includes('invalid')||m.includes('Token'))return 'رمز التحقق غير صحيح أو انتهت صلاحيته.';
 if(m.includes('no_attempts'))return 'انتهت محاولاتك.';
 return 'تعذر إكمال العملية. حاول مرة أخرى.';
}