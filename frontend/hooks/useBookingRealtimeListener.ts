import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const useBookingRealtimeListener = (date, callback) => {
    useEffect(() => {
        const subscription = supabase
            .from('bookings')
            .on('INSERT', payload => {
                if (new Date(payload.new.date).toISOString().split('T')[0] === date) {
                    callback(payload.new);
                }
            })
            .on('UPDATE', payload => {
                if (new Date(payload.new.date).toISOString().split('T')[0] === date) {
                    callback(payload.new);
                }
            })
            .on('DELETE', payload => {
                if (new Date(payload.old.date).toISOString().split('T')[0] === date) {
                    callback(payload.old);
                }
            })
            .subscribe();

        return () => {
            supabase.removeSubscription(subscription);
        };
    }, [date, callback]);
};

export default useBookingRealtimeListener;
