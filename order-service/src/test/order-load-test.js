import http from 'k6/http';                                                                                                                                                   
  import { check, sleep } from 'k6';
  import { Rate } from 'k6/metrics';                                                                                                                                            
                                                                  
  const errorRate = new Rate('errors');                                                                                                                                         
   
  export const options = {                                                                                                                                                      
    stages: [                                                     
      { duration: '30s', target: 10 },  // ramp-up: 0 → 10 użytkowników
      { duration: '1m',  target: 10 },  // sustain: 10 użytkowników przez minutę                                                                                                
      { duration: '30s', target: 0  },  // ramp-down: 10 → 0                                                                                                                    
    ],                                                                                                                                                                          
    thresholds: {                                                                                                                                                               
      http_req_duration: ['p(95)<500'],  // 95% requestów poniżej 500ms                                                                                                         
      errors:            ['rate<0.01'],  // mniej niż 1% błędów                                                                                                                 
    },                                                                                                                                                                          
  };                                                                                                                                                                            
                                                                                                                                                                                
  const BASE_URL = 'http://localhost:8080';                       

  export default function () {
    const payload = JSON.stringify({
      skuCode:  'iphone_15',
      price:    1000,                                                                                                                                                           
      quantity: 1,
    });                                                                                                                                                                         
                                                                  
    const params = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = http.post(`${BASE_URL}/api/order`, payload, params);                                                                                                            
   
    const ok = check(res, {                                                                                                                                                     
      'status is 201':              (r) => r.status === 201,      
      'response time < 500ms':      (r) => r.timings.duration < 500,                                                                                                            
      'body contains success msg':  (r) => r.body.includes('Order Placed Successfully'),
    });                                                                                                                                                                         
                                                                  
    errorRate.add(!ok);                                                                                                                                                         
    sleep(1);                                                     
  }                                     