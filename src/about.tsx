export function AboutModal({ close }: { close: () => void }) {
    return (
        <div class='modal-container' onClick={close}>
            <div class='modal' onClick={(e) => (e.cancelBubble = true)}>
                <h2>What?</h2>

                <p>
                    This is a clock. However, unlike most clocks, this one can
                    show the time as not only the traditional hours, minutes and
                    seconds; but also as rotations, in both degrees and radians.
                </p>

                <h2>Why?</h2>

                <p>
                    It was a somewhat random idea I had during a maths lesson,
                    that I thought was interesting and so I decided to make it.
                </p>

                <footer>
                    Copyright (c) 2022{' '}
                    <a href='https://ashhhleyyy.dev/'>Ashhhleyyy</a>. Created
                    with 💖.
                </footer>

                <button class='button' onClick={close}>
                    Close
                </button>
            </div>
        </div>
    );
}
