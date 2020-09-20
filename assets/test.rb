# Welcome to Sonic Pi v2.10
live_loop :arp do
  use_synth :pretty_bell
  2.times do
    play :A
    sleep 1
    play :B
    sleep 1
    play :C, release: 0.9
    sleep 1
  end
  play :A
  sleep 1
  play :B
  sleep 1
  play :A, release: 0.87
  sleep 1
  play :A1
end
