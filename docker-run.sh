docker run \
  -it \
  --rm \
  --name decide_stats_visualizer \
  -v ${PWD}:/app \
  -v /app/node_modules \
  -p 3000:3000 \
  decide_stats_visualizer
