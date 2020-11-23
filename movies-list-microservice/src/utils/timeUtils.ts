export const benchmarker = function(name) {
    const start = new Date();
    return {
        stop: function() {
            const end  = new Date();
            const time = end.getTime() - start.getTime();
            console.log('Timer:', name, 'finished in', time, 'ms');
        }
    }
};