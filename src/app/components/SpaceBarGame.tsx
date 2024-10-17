import React, { useEffect, useRef } from 'react';

interface SpaceBarGameProps {
    difficulty: number;
}

const SpaceBarGame: React.FC<SpaceBarGameProps> = ({ difficulty }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    useEffect(() => {
        const cvs = canvasRef.current;
        if (!cvs) return;

        const ctx = cvs.getContext('2d');
        if (!ctx) return;


        let frames = 0;
        const DEGREE = Math.PI / 180;


        const sprite = new Image();


        sprite.src = "/sprite.png";


        let imagesLoaded = 0;
        const totalImages = 1;

        sprite.onload = checkImagesLoaded;


        sprite.onerror = () => console.error("Failed to load sprite.");

        function checkImagesLoaded() {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                draw();
            }
        }

        const SCORE_S = new Audio();
        SCORE_S.src = "/audio/sfx_point.wav";

        const FLAP = new Audio();
        FLAP.src = "/audio/sfx_flap.wav";

        const HIT = new Audio();
        HIT.src = "/audio/sfx_hit.wav";

        const SWOOSHING = new Audio();
        SWOOSHING.src = "/audio/sfx_swooshing.wav";

        const DIE = new Audio();
        DIE.src = "/audio/sfx_die.wav";


        const state = {
            current: 0,
            getReady: 0,
            game: 1,
            over: 2,
        };

        const restartBtn = {
            x: cvs.width / 2 - 30,
            y: cvs.height / 2 - 50,
            w: 96,
            h: 45
        }





        const handleCanvasClick = (evt: MouseEvent) => {
            switch (state.current) {
                case state.getReady:
                    state.current = state.game;
                    SWOOSHING.play();
                    break;
                case state.game:
                    bird.flap();
                    FLAP.play();
                    break;
                case state.over:
                    const rect = cvs.getBoundingClientRect();
                    const clickX = evt.clientX - rect.left;
                    const clickY = evt.clientY - rect.top;

                    if (
                        clickX >= restartBtn.x &&
                        clickX <= restartBtn.x + restartBtn.w &&
                        clickY >= restartBtn.y &&
                        clickY <= restartBtn.y + restartBtn.h
                    ) {
                        pipes.reset();
                        bird.speedReset();
                        score.reset();
                        state.current = state.getReady;
                    }
                    break;
                default:
                    break;
            }
        };

        cvs.addEventListener('click', handleCanvasClick);

        // BACKGROUND
        const bg = {
            sX: 0,
            sY: 0,
            w: 275,
            h: 226,
            x: 0,
            y: cvs.height - 356,
            wd: 240,
            hd: 356,

            draw: function () {
                ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.wd, this.hd);
                ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.wd, this.y, this.wd, this.hd);
                ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.wd + this.wd, this.y, this.wd, this.hd);
                ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.wd + this.wd + this.wd, this.y, this.wd, this.hd);
                ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.wd + this.wd + this.wd + this.wd, this.y, this.wd, this.hd);
                ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.wd + this.wd + this.wd + this.wd + this.wd, this.y, this.wd, this.hd);
            }

        }

        // FOREGROUND
        const fg = {
            sX: 276,
            sY: 0,
            w: 224,
            h: 112,
            x: 0,
            y: cvs.height - 162,
            wd: 240,
            hd: 162,

            dx: difficulty,

            draw: function () {
                ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.wd, this.hd);
                ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.wd, this.y, this.wd, this.hd);
                ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.wd + this.wd, this.y, this.wd, this.hd);
                ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.wd + this.wd + this.wd, this.y, this.wd, this.hd);
                ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.wd + this.wd + this.wd + this.wd, this.y, this.wd, this.hd);
                ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.wd + this.wd + this.wd + this.wd + this.wd, this.y, this.wd, this.hd);
                ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.wd + this.wd + this.wd + this.wd + this.wd + this.wd, this.y, this.wd, this.hd);
            },

            update: function () {
                if (state.current == state.game) {
                    this.x = (this.x - this.dx) % (this.w / 2);
                }
            }
        }

        const bird = {
            animation: [
                { sX: 276, sY: 112 },
                { sX: 276, sY: 139 },
                { sX: 276, sY: 164 },
                { sX: 276, sY: 139 }
            ],
            x: 50,
            y: 150,
            w: 34,
            h: 26,

            radius: 12,

            frame: 0,

            gravity: 0.25,
            jump: 4.6,
            speed: 0,
            rotation: 0,
            period: 30,

            draw: function () {
                const bird = this.animation[this.frame];

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, - this.w / 2, - this.h / 2, this.w, this.h);

                ctx.restore();
            },

            flap: function () {
                this.speed = - this.jump;
            },

            update: function () {
                this.period = state.current == state.getReady ? 10 : 5;
                this.frame += frames % this.period == 0 ? 1 : 0;
                this.frame = this.frame % this.animation.length;

                if (state.current == state.getReady) {
                    this.y = 150;
                    this.rotation = 0 * DEGREE;
                } else {
                    this.speed += this.gravity;
                    this.y += this.speed;

                    if (this.y + this.h / 2 >= cvs.height - fg.hd) {
                        this.y = cvs.height - fg.hd - this.h / 2;
                        if (state.current == state.game) {
                            state.current = state.over;
                            DIE.play();

                        }
                    }
                    if (this.speed >= this.jump) {
                        this.rotation = 90 * DEGREE;
                        this.frame = 1;
                    } else {
                        this.rotation = -25 * DEGREE;
                    }
                }

            },
            speedReset: function () {
                this.speed = 0;
            }
        }





        const getReady = {
            sX: 0,
            sY: 228,
            w: 173,
            h: 152,
            x: cvs.width / 2 - 200 / 2,
            y: 80,
            wd: 223,
            hd: 200,

            draw: function () {
                if (state.current == state.getReady) {
                    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.wd, this.hd);
                }
            }

        }

        // GAME OVER MESSAGE
        const gameOver = {
            sX: 175,
            sY: 228,
            w: 225,
            h: 202,
            x: (cvs.width / 2) - (275 / 2),
            y: 90,
            wd: 275,
            hd: 252,

            draw: function () {
                if (state.current == state.over) {
                    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.wd, this.hd);
                }
            }

        }





        // PIPES


        type Position = {
            x: number;
            y: number;
        };
        const pipes = {
            position: [] as Position[],

            top: {
                sX: 553,
                sY: 0
            },
            bottom: {
                sX: 502,
                sY: 0
            },

            w: 53,
            h: 400,
            gap: 85,
            maxYPos: -150,
            dx: difficulty,

            draw: function () {
                for (let i = 0; i < this.position.length; i++) {
                    const p = this.position[i];

                    const topYPos = p.y;
                    const bottomYPos = p.y + this.h + this.gap;

                    // top pipe
                    ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);

                    // bottom pipe
                    ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
                }
            },

            update: function () {
                if (state.current !== state.game) return;

                if (state.current !== state.game) return;
                const spawnInterval = 100 - (difficulty - 2) * 15;
                if (frames % spawnInterval == 0) {
                    this.position.push({
                        x: cvs.width,
                        y: this.maxYPos * (Math.random() + 1)
                    });
                }
                for (let i = 0; i < this.position.length; i++) {
                    const p = this.position[i];

                    const bottomPipeYPos = p.y + this.h + this.gap;

                    // COLLISION DETECTION
                    // TOP PIPE
                    if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
                        state.current = state.over;
                        HIT.play();
                    }
                    // BOTTOM PIPE
                    if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h) {
                        state.current = state.over;
                        HIT.play();
                    }

                    // MOVE THE PIPES TO THE LEFT
                    p.x -= this.dx;

                    // if the pipes go beyond canvas, we delete them from the array
                    if (p.x + this.w <= 0) {
                        this.position.shift();
                        score.value += 1;

                        score.best = Math.max(score.value, score.best);
                        localStorage.setItem("best", String(score.best));
                    }
                }
            },

            reset: function () {
                this.position = [];
            }

        }




        const score = {
            best: parseInt(localStorage.getItem("best") ?? "0", 10),
            value: 0,

            draw: function () {
                ctx.fillStyle = "#FFF";
                ctx.strokeStyle = "#000";

                if (state.current == state.game) {
                    ctx.lineWidth = 2;
                    ctx.font = "40px Teko";
                    ctx.fillText(String(this.value), cvs.width / 2, 50);
                    ctx.strokeText(String(this.value), cvs.width / 2, 50);

                } else if (state.current == state.over) {
                    // SCORE VALUE
                    ctx.font = "28px Teko";
                    ctx.fillText(String(this.value), cvs.width / 2 + 100, 206);
                    ctx.strokeText(String(this.value), cvs.width / 2 + 100, 206);
                    // BEST SCORE
                    ctx.fillText(String(this.best), cvs.width / 2 + 80, 258);
                    ctx.strokeText(String(this.best), cvs.width / 2 + 80, 258);
                }
            },

            reset: function () {
                this.value = 0;
            }
        }



        function draw() {
            if (!ctx || !cvs) return;
            ctx.fillStyle = "#70c5ce";
            ctx.fillRect(0, 0, cvs.width, cvs.height);

            bg.draw();
            pipes.draw();
            fg.draw();
            bird.draw();
            getReady.draw();
            gameOver.draw();
            score.draw();
        }

        function update() {
            bird.update();
            fg.update();
            pipes.update();
        }


        function loop() {
            update();
            draw();
            frames++;

            requestAnimationFrame(loop);
        }
        loop();

        return () => {
            cvs.removeEventListener('click', handleCanvasClick);
        };
    }, []);

    return (
        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ display: 'block', margin: 'auto' }} />
    );
};

export default SpaceBarGame;
