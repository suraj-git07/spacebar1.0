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

        const bgImage = new Image();
        const sprite = new Image();


        bgImage.src = "/gamebg2.jpg";
        sprite.src = "/sprite1.png";


        let imagesLoaded = 0;
        const totalImages = 2;


        bgImage.onload = checkImagesLoaded;
        sprite.onload = checkImagesLoaded;


        bgImage.onerror = () => console.error("Failed to load bgImage.");
        sprite.onerror = () => console.error("Failed to load sprite.");

        function checkImagesLoaded() {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                draw();
            }
        }


        const state = {
            current: 0,
            getReady: 0,
            game: 1,
            over: 2,
        };

        const restartBtn = {
            x: cvs.width / 2 - 50,
            y: (cvs.height / 2) + (70),
            w: 93,
            h: 50
        }


        const handleCanvasClick = (evt: MouseEvent) => {
            switch (state.current) {
                case state.getReady:
                    state.current = state.game;
                    break;
                case state.game:
                    man.flap();
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
                        lazer.reset();
                        man.speedReset();
                        score.reset();
                        state.current = state.getReady;
                    }
                    break;
                default:
                    break;
            }
        };

        cvs.addEventListener('click', handleCanvasClick);

        const wallup = {
            sX: 0,
            sY: 232,
            w: 1382,
            h: 173,
            x: 0,
            y: 0,
            wd: 240,
            hd: 50,

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
                    this.x = (this.x - this.dx) % (this.wd / 2);
                }
            }

        }

        // Wall Down
        const walldown = {
            sX: 0,
            sY: 0,
            w: 1382,
            h: 173,
            x: 0,
            y: cvs.height - 80,
            wd: 240,
            hd: 80,

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
                    this.x = (this.x - this.dx) % (this.wd / 2);
                }
            }
        }


        const man = {
            animation: [
                { sX: 39, sY: 463 },
                { sX: 39, sY: 463 },
                { sX: 39, sY: 463 },
                { sX: 39, sY: 463 }
            ],
            x: 50,
            y: 150,
            w: 143,
            h: 220,
            wd: 50,
            hd: 42,

            radiusw: 26,
            radiush: 22,

            frame: 0,
            gravity: 0.25,
            jump: 4.6,
            speed: 0,
            rotation: 0,
            period: 30,

            flap: function () {
                this.speed = - this.jump;
            },

            draw: function () {
                const man = this.animation[this.frame];
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.drawImage(sprite, man.sX, man.sY, this.w, this.h, - this.wd / 2, - this.hd / 2, this.wd, this.hd);
                ctx.restore();
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


                    if (this.y + this.hd / 2 >= (cvs.height - walldown.hd)) {
                        this.y = cvs.height - walldown.hd - this.hd / 2;
                        if (state.current == state.game) {
                            state.current = state.over;

                        }
                    }

                    if (this.y - this.hd / 2 <= (wallup.hd)) {
                        this.y = wallup.hd + this.hd;
                        if (state.current == state.game) {
                            state.current = state.over;

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
            sX: 1019,
            sY: 440,
            w: 256,
            h: 258,
            wd: 184,
            hd: 189,
            x: (cvs.width / 2) - (92),
            y: (cvs.height / 2) - (189 / 2),

            draw: function () {
                if (state.current == state.getReady) {
                    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.wd, this.hd);
                }
            }

        }

        const gameOver = {
            sX: 733,
            sY: 436,
            w: 242,
            h: 366,
            wd: 182,
            hd: 275,
            x: cvs.width / 2 - 91,
            y: (cvs.height / 2) - (275 / 2),  //90

            draw: function () {
                if (state.current == state.over) {
                    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.wd, this.hd);
                }
            }

        }

        type Position = {
            x: number;
            y: number;
        };

        const lazer = {
            position: [] as Position[],

            top: {
                sX: 529,
                sY: 572
            },
            bottom: {
                sX: 338,
                sY: 466
            },

            w: 73,
            h: 413,
            wd: 55,
            hd: 550,
            gap: 120,
            maxYPos: -(150),
            dx: difficulty, // Initial speed
            speedIncrement: 0.003,
            maxSpeed: 10,

            draw: function () {
                this.position.forEach((p) => {
                    const topYPos = p.y;
                    const bottomYPos = p.y + this.hd + this.gap;


                    // top lazer
                    ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.wd, this.hd);

                    // bottom lazer
                    ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.wd, this.hd);
                })
            },

            update: function () {
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

                    const bottomPipeYPos = p.y + this.hd + this.gap;

                    // COLLISION DETECTION
                    // TOP lazer
                    if (man.x + man.radiusw > p.x && man.x - man.radiusw < p.x + this.wd && man.y + man.radiush > p.y && man.y - man.radiush < p.y + this.hd) {
                        state.current = state.over;
                        // HIT.play();
                    }
                    // // BOTTOM lazer
                    if (man.x + man.radiusw > p.x && man.x - man.radiusw < p.x + this.wd && man.y + man.radiush > bottomPipeYPos && man.y - man.radiush < bottomPipeYPos + this.hd) {
                        state.current = state.over;
                        // HIT.play();
                    }

                    // MOVE THE lazer TO THE LEFT
                    p.x -= this.dx;

                    // if the lazer go beyond canvas, we delete them from the array
                    if (p.x + this.wd <= 0) {
                        this.position.shift();
                        score.value += 1;
                        // // SCORE_S.play();
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
                    ctx.font = "35px Teko";
                    ctx.fillText(String(this.value), cvs.width / 2, 100);

                } else if (state.current == state.over) {
                    // SCORE VALUE
                    ctx.font = "25px Teko";

                    // Draw "Score:" label
                    ctx.fillText("Score ", cvs.width / 2 - 100, cvs.height / 2 - 200);
                    // Draw the actual score value
                    ctx.fillText(String(this.value), cvs.width / 2 - 78, cvs.height / 2 - 180);

                    // BEST SCORE
                    // Draw "Best:" label
                    ctx.fillText("Best ", cvs.width / 2 + 50, cvs.height / 2 - 200);
                    // Draw the best score value
                    ctx.fillText(String(this.value), cvs.width / 2 + 67, cvs.height / 2 - 180);

                }

            },

            reset: function () {
                this.value = 0;
            }
        }


        function draw() {
            if (!ctx || !cvs) return;
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.globalAlpha = 0.5;
            ctx.drawImage(bgImage, 0, 0, cvs.width, cvs.height);
            ctx.globalAlpha = 1.0;

            lazer.draw();
            wallup.draw();
            walldown.draw();
            man.draw();
            getReady.draw();
            gameOver.draw();
            score.draw();
        }

        function update() {
            man.update();
            walldown.update();
            wallup.update();
            lazer.update();
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
