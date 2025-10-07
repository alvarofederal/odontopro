/**
 * Verificar se determinando slot já passou
 */

export function isToday(date: Date){
    const now = new Date();

    return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
    )
}

export function isSlotInThePast(slotTime: string){
    //10:00
    const [slotHour, slotMinute] = slotTime.split(":").map(Number)

    const now = new Date()
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (slotHour< currentHour) {
        return true; //true quer dizer qye a hora já passou
    } else if (slotHour === currentHour && slotMinute <= currentMinute) {
        return true;
    }
    return false;
}