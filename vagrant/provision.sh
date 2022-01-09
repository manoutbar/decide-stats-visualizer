# nginx install
sudo apt update
sudo apt upgrade -y
sudo apt install -y nginx curl git
# sudo apt install -y curl git

# firewall config
sudo ufw allow 'Nginx Full'

# enable service on system init
sudo systemctl enable nginx

# nodejs install
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm install 12

# project install
git clone https://github.com/manoutbar/decide-stats-visualizer
cd decide-stats-visualizer

npm config set user 0
npm config set unsafe-perm true

npm install
# npm start
npm run build

# project nginx deployment
# sudo mkdir -p /var/www/decide-stats-visualizer/html
# sudo chown -R $USER:$USER /var/www/decide-stats-visualizer/html
# sudo chmod -R 755 /var/www/decide-stats-visualizer
# cp -R build/* /var/www/decide-stats-visualizer/html/
cp -R build/* /var/www/html/

sudo chown -R $USER:$USER /var/www/html

sudo systemctl restart nginx