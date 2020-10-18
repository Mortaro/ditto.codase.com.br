import Nullstack from 'nullstack';

import './Application.css';

class Application extends Nullstack {

  static async start({server, project}) {
    server.port = 21592;
    project.name = "Ditto Online";
    const {echo} = await import('./echo');
    echo(server);
  }

  room = "";
  command = "";
  socket = null;
  shortcuts = [];
  executing = false;

  initiate({environment, page}) {
    page.title = "Ditto Server";
    if(environment.client) {
      this.connect();
      if(localStorage['shortcuts']) {
        this.shortcuts = JSON.parse(localStorage['shortcuts']);
      }
    }
  }

  connect() {
    this.socket = new WebSocket("wss://" + location.host, "protocolOne");
    this.socket.onclose = () => setTimeout(this.connect, 1000);
    this.socket.onerror = () => this.socket.close();
  }

  remove({shortcut}) {
    this.shortcuts = this.shortcuts.filter((s) => s != shortcut);
    localStorage['shortcuts'] = JSON.stringify(this.shortcuts);
  }

  execute({shortcut}) {
    if(this.executing) return;
    if(!shortcut) {
      if(!this.room || !this.command) return;
      shortcut = this.room + ' ' + this.command;
    }
    this.socket.send(shortcut);
    if(!this.shortcuts.includes(shortcut)) {
      this.shortcuts.push(shortcut);
      localStorage['shortcuts'] = JSON.stringify(this.shortcuts);
    }
    this.room = '';
    this.command = '';
    this.executing = true;
    setTimeout(() => this.executing = false, 500);
  }

  renderShortcut({shortcut}) {
    return (
      <div class="xsb x12 m2b bgm1 bgd p4x p2y">
        <div class="yy"> {shortcut} </div>
        <div class="yy">
          <button class="cm1 bgi2 p2x p1y m1r" onclick={this.remove} shortcut={shortcut} disabled={this.executing}> x </button>
          <button class="cm1 bgi1 p2x p1y m1r" onclick={this.execute} shortcut={shortcut} disabled={this.executing}> Execute </button>
        </div>
      </div>
    )
  }

  render({page}) {
    return (
      <main class="x12 yy y12 yvh bgm1 bgd">
        <div class="x xx p4x">
          <form class="x12 bgm1 md+x6 s1" onsubmit={this.execute}>
            <h1 class="xx p3y bcm1b bcdb ci1"> {page.title} </h1>
            <div class="xx p4">
              <input bind="room" placeholder="room" class="x12 bcm1 bcd p4 m2b" />
              <input bind="command" placeholder="command" class="x12 bcm1 bcd p4 m2b" />
              <button class="x12 xx bgi1 cm1 p4" disabled={this.executing}> Execute </button>
            </div>
            {this.shortcuts.length > 0 &&
              <div class="x12 p4x p4t p2b bcm1t bcdt">
                {this.shortcuts.map((shortcut) => <Shortcut shortcut={shortcut} />)}
              </div>
            }
          </form>
        </div>
      </main>
    )
  }


}

export default Application;