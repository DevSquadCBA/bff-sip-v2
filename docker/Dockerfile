FROM ubuntu:20.04

# Install unzip, wget, curl
RUN apt-get update && \
    apt-get install -y unzip wget curl

# Install AWS CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install

# Install SAM CLI
RUN curl "https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip" -o "sam.zip" && \
    unzip sam.zip -d sam && \
    ./sam/install

# Install NodeJS
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y yarn

WORKDIR /app

COPY . /app

RUN yarn install

# Run and attach node ./scripts/server.js
CMD ["node", "./scripts/server.js"]
