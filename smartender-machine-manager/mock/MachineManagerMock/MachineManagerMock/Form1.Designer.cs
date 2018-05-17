namespace MachineManagerMock
{
    partial class Form1
    {
        /// <summary>
        /// Erforderliche Designervariable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Verwendete Ressourcen bereinigen.
        /// </summary>
        /// <param name="disposing">True, wenn verwaltete Ressourcen gelöscht werden sollen; andernfalls False.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Vom Windows Form-Designer generierter Code

        /// <summary>
        /// Erforderliche Methode für die Designerunterstützung.
        /// Der Inhalt der Methode darf nicht mit dem Code-Editor geändert werden.
        /// </summary>
        private void InitializeComponent()
        {
            this.textBoxMachineManagerPort = new System.Windows.Forms.TextBox();
            this.labelMachineManagerPort = new System.Windows.Forms.Label();
            this.labelWebServerAddress = new System.Windows.Forms.Label();
            this.textBoxWebServerAddress = new System.Windows.Forms.TextBox();
            this.buttonStartServer = new System.Windows.Forms.Button();
            this.buttonReportMachine = new System.Windows.Forms.Button();
            this.textBoxReportMachine = new System.Windows.Forms.TextBox();
            this.listBoxActiveMachines = new System.Windows.Forms.ListBox();
            this.labelReportedMachines = new System.Windows.Forms.Label();
            this.buttonRemoveMachine = new System.Windows.Forms.Button();
            this.textBoxResults = new System.Windows.Forms.TextBox();
            this.buttonClearResults = new System.Windows.Forms.Button();
            this.listBoxBusy = new System.Windows.Forms.ListBox();
            this.labelBusy = new System.Windows.Forms.Label();
            this.buttonMoveToBusy = new System.Windows.Forms.Button();
            this.buttonMoveToActive = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // textBoxMachineManagerPort
            // 
            this.textBoxMachineManagerPort.Location = new System.Drawing.Point(134, 10);
            this.textBoxMachineManagerPort.Name = "textBoxMachineManagerPort";
            this.textBoxMachineManagerPort.Size = new System.Drawing.Size(112, 20);
            this.textBoxMachineManagerPort.TabIndex = 0;
            this.textBoxMachineManagerPort.Text = "5000";
            // 
            // labelMachineManagerPort
            // 
            this.labelMachineManagerPort.AutoSize = true;
            this.labelMachineManagerPort.Location = new System.Drawing.Point(13, 13);
            this.labelMachineManagerPort.Name = "labelMachineManagerPort";
            this.labelMachineManagerPort.Size = new System.Drawing.Size(115, 13);
            this.labelMachineManagerPort.TabIndex = 1;
            this.labelMachineManagerPort.Text = "Machine Manager Port";
            // 
            // labelWebServerAddress
            // 
            this.labelWebServerAddress.AutoSize = true;
            this.labelWebServerAddress.Location = new System.Drawing.Point(13, 39);
            this.labelWebServerAddress.Name = "labelWebServerAddress";
            this.labelWebServerAddress.Size = new System.Drawing.Size(105, 13);
            this.labelWebServerAddress.TabIndex = 2;
            this.labelWebServerAddress.Text = "Web Server Address";
            // 
            // textBoxWebServerAddress
            // 
            this.textBoxWebServerAddress.Location = new System.Drawing.Point(134, 36);
            this.textBoxWebServerAddress.Name = "textBoxWebServerAddress";
            this.textBoxWebServerAddress.Size = new System.Drawing.Size(245, 20);
            this.textBoxWebServerAddress.TabIndex = 3;
            this.textBoxWebServerAddress.Text = "http://localhost:10000/";
            // 
            // buttonStartServer
            // 
            this.buttonStartServer.Location = new System.Drawing.Point(252, 8);
            this.buttonStartServer.Name = "buttonStartServer";
            this.buttonStartServer.Size = new System.Drawing.Size(127, 23);
            this.buttonStartServer.TabIndex = 4;
            this.buttonStartServer.Text = "Start Server";
            this.buttonStartServer.UseVisualStyleBackColor = true;
            this.buttonStartServer.Click += new System.EventHandler(this.buttonStartServer_Click);
            // 
            // buttonReportMachine
            // 
            this.buttonReportMachine.Location = new System.Drawing.Point(250, 171);
            this.buttonReportMachine.Name = "buttonReportMachine";
            this.buttonReportMachine.Size = new System.Drawing.Size(129, 23);
            this.buttonReportMachine.TabIndex = 5;
            this.buttonReportMachine.Text = "Report Machine";
            this.buttonReportMachine.UseVisualStyleBackColor = true;
            this.buttonReportMachine.Click += new System.EventHandler(this.buttonReportMachine_Click);
            // 
            // textBoxReportMachine
            // 
            this.textBoxReportMachine.Location = new System.Drawing.Point(12, 174);
            this.textBoxReportMachine.Name = "textBoxReportMachine";
            this.textBoxReportMachine.Size = new System.Drawing.Size(234, 20);
            this.textBoxReportMachine.TabIndex = 6;
            // 
            // listBoxActiveMachines
            // 
            this.listBoxActiveMachines.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left)));
            this.listBoxActiveMachines.FormattingEnabled = true;
            this.listBoxActiveMachines.Location = new System.Drawing.Point(12, 213);
            this.listBoxActiveMachines.Name = "listBoxActiveMachines";
            this.listBoxActiveMachines.Size = new System.Drawing.Size(234, 316);
            this.listBoxActiveMachines.TabIndex = 7;
            // 
            // labelReportedMachines
            // 
            this.labelReportedMachines.AutoSize = true;
            this.labelReportedMachines.Location = new System.Drawing.Point(9, 197);
            this.labelReportedMachines.Name = "labelReportedMachines";
            this.labelReportedMachines.Size = new System.Drawing.Size(86, 13);
            this.labelReportedMachines.TabIndex = 8;
            this.labelReportedMachines.Text = "Active Machines";
            // 
            // buttonRemoveMachine
            // 
            this.buttonRemoveMachine.Location = new System.Drawing.Point(253, 213);
            this.buttonRemoveMachine.Name = "buttonRemoveMachine";
            this.buttonRemoveMachine.Size = new System.Drawing.Size(126, 23);
            this.buttonRemoveMachine.TabIndex = 9;
            this.buttonRemoveMachine.Text = "RemoveMachine";
            this.buttonRemoveMachine.UseVisualStyleBackColor = true;
            this.buttonRemoveMachine.Click += new System.EventHandler(this.buttonRemoveMachine_Click);
            // 
            // textBoxResults
            // 
            this.textBoxResults.Location = new System.Drawing.Point(625, 36);
            this.textBoxResults.Multiline = true;
            this.textBoxResults.Name = "textBoxResults";
            this.textBoxResults.Size = new System.Drawing.Size(527, 492);
            this.textBoxResults.TabIndex = 10;
            // 
            // buttonClearResults
            // 
            this.buttonClearResults.Location = new System.Drawing.Point(625, 7);
            this.buttonClearResults.Name = "buttonClearResults";
            this.buttonClearResults.Size = new System.Drawing.Size(75, 23);
            this.buttonClearResults.TabIndex = 11;
            this.buttonClearResults.Text = "Clear";
            this.buttonClearResults.UseVisualStyleBackColor = true;
            this.buttonClearResults.Click += new System.EventHandler(this.buttonClearResults_Click);
            // 
            // listBoxBusy
            // 
            this.listBoxBusy.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left)));
            this.listBoxBusy.FormattingEnabled = true;
            this.listBoxBusy.Location = new System.Drawing.Point(385, 213);
            this.listBoxBusy.Name = "listBoxBusy";
            this.listBoxBusy.Size = new System.Drawing.Size(234, 316);
            this.listBoxBusy.TabIndex = 12;
            // 
            // labelBusy
            // 
            this.labelBusy.AutoSize = true;
            this.labelBusy.Location = new System.Drawing.Point(382, 197);
            this.labelBusy.Name = "labelBusy";
            this.labelBusy.Size = new System.Drawing.Size(79, 13);
            this.labelBusy.TabIndex = 13;
            this.labelBusy.Text = "Busy Machines";
            // 
            // buttonMoveToBusy
            // 
            this.buttonMoveToBusy.Location = new System.Drawing.Point(253, 242);
            this.buttonMoveToBusy.Name = "buttonMoveToBusy";
            this.buttonMoveToBusy.Size = new System.Drawing.Size(126, 23);
            this.buttonMoveToBusy.TabIndex = 14;
            this.buttonMoveToBusy.Text = ">>";
            this.buttonMoveToBusy.UseVisualStyleBackColor = true;
            this.buttonMoveToBusy.Click += new System.EventHandler(this.buttonMoveToBusy_Click);
            // 
            // buttonMoveToActive
            // 
            this.buttonMoveToActive.Location = new System.Drawing.Point(253, 271);
            this.buttonMoveToActive.Name = "buttonMoveToActive";
            this.buttonMoveToActive.Size = new System.Drawing.Size(126, 23);
            this.buttonMoveToActive.TabIndex = 15;
            this.buttonMoveToActive.Text = "<<";
            this.buttonMoveToActive.UseVisualStyleBackColor = true;
            this.buttonMoveToActive.Click += new System.EventHandler(this.buttonMoveToActive_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1164, 540);
            this.Controls.Add(this.buttonMoveToActive);
            this.Controls.Add(this.buttonMoveToBusy);
            this.Controls.Add(this.labelBusy);
            this.Controls.Add(this.listBoxBusy);
            this.Controls.Add(this.buttonClearResults);
            this.Controls.Add(this.textBoxResults);
            this.Controls.Add(this.buttonRemoveMachine);
            this.Controls.Add(this.labelReportedMachines);
            this.Controls.Add(this.listBoxActiveMachines);
            this.Controls.Add(this.textBoxReportMachine);
            this.Controls.Add(this.buttonReportMachine);
            this.Controls.Add(this.buttonStartServer);
            this.Controls.Add(this.textBoxWebServerAddress);
            this.Controls.Add(this.labelWebServerAddress);
            this.Controls.Add(this.labelMachineManagerPort);
            this.Controls.Add(this.textBoxMachineManagerPort);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox textBoxMachineManagerPort;
        private System.Windows.Forms.Label labelMachineManagerPort;
        private System.Windows.Forms.Label labelWebServerAddress;
        private System.Windows.Forms.TextBox textBoxWebServerAddress;
        private System.Windows.Forms.Button buttonStartServer;
        private System.Windows.Forms.Button buttonReportMachine;
        private System.Windows.Forms.TextBox textBoxReportMachine;
        private System.Windows.Forms.ListBox listBoxActiveMachines;
        private System.Windows.Forms.Label labelReportedMachines;
        private System.Windows.Forms.Button buttonRemoveMachine;
        private System.Windows.Forms.TextBox textBoxResults;
        private System.Windows.Forms.Button buttonClearResults;
        private System.Windows.Forms.ListBox listBoxBusy;
        private System.Windows.Forms.Label labelBusy;
        private System.Windows.Forms.Button buttonMoveToBusy;
        private System.Windows.Forms.Button buttonMoveToActive;
    }
}

