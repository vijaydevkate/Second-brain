//creating a random function for generate share link

export function random(len: number){
    let options = 'jhwbcjhkewbcvjhkebvjheqvuhjf654w176'
    let ans = ""

    for(let i = 0; i < options.length; i++){
        ans  += options[Math.floor(Math.random() * options.length)]
    }
    return ans;
}