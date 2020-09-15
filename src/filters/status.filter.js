export default function status(value) {    
        if (Math.abs(value) < 1) {
          return value.toFixed(4);
        } else {
          return value.toFixed(2);
        }        
}
